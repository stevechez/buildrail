import type {
	BusinessProfile,
	ContentPackScore,
	ContextItem,
	JobContentInput,
	JobContentPack,
} from '@/types';
import { contextSkillPresets } from '@/lib/context-skill-presets';
import { scoreContentPack } from '@/lib/score-content-pack';

function getGrade(total: number): ContentPackScore['grade'] {
	if (total >= 90) {
		return 'Excellent';
	}

	if (total >= 75) {
		return 'Strong';
	}

	if (total >= 60) {
		return 'Good';
	}

	return 'Needs Work';
}

export function getActiveContentSkills(contextItems: ContextItem[]) {
	const presetTitles = new Set(contextSkillPresets.map(skill => skill.title));

	return contextItems.filter(
		item => item.enabled && presetTitles.has(item.title),
	);
}

export function applySkillScoreBoost({
	score,
	contextItems,
}: {
	score: ContentPackScore;
	contextItems: ContextItem[];
}): ContentPackScore {
	const activeSkills = getActiveContentSkills(contextItems);

	if (activeSkills.length === 0) {
		return score;
	}

	const boost = Math.min(activeSkills.length * 2, 8);
	const boostedTotal = Math.min(score.total + boost, 100);

	const skillNames = activeSkills.map(skill => skill.title).slice(0, 4);

	return {
		...score,
		total: boostedTotal,
		grade: getGrade(boostedTotal),
		strengths: [
			...score.strengths,
			`Used ${activeSkills.length} active content skill${
				activeSkills.length === 1 ? '' : 's'
			}: ${skillNames.join(', ')}.`,
		],
		factors: [
			...score.factors,
			{
				label: 'Skill System',
				score: boost,
				maxScore: 8,
				feedback:
					'Active prebuilt content skills were applied through the Context Vault.',
			},
		],
	};
}

export function scoreContentPackWithSkills({
	profile,
	input,
	pack,
	contextItems,
}: {
	profile: BusinessProfile;
	input: JobContentInput;
	pack: JobContentPack;
	contextItems: ContextItem[];
}): ContentPackScore {
	const baseScore = scoreContentPack({
		profile,
		input,
		pack,
	});

	return applySkillScoreBoost({
		score: baseScore,
		contextItems,
	});
}
