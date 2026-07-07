export interface Finding {
	item: string;
	status: 'PASS' | 'FAIL' | 'WARNING';
	fix: string;
	code_reference?: string;
	evidence_url?: string;
}

export interface VerdictMetadata {
	fixed_states?: Record<number, boolean>;
	project_notes?: string;
	last_updated_at?: Record<number, string>;
	evidence_photos?: string[];
	notes_last_edited?: string;
	notes_edited_by?: string;
}

export interface VerdictReportData {
	id: string;
	property_address: string;
	trade_type: string;
	status: string;
	contractor_phone?: string;
	metadata?: VerdictMetadata;
	technician_notes: {
		confidence_score: number;
		findings: Finding[];
	};
}
