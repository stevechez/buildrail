import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ExamplePack } from "@/lib/example-packs";

export function ExamplePackCard({ pack }: { pack: ExamplePack }) {
  return (
    <Card className="overflow-hidden shadow-sm">
      <CardHeader className="border-b bg-muted/40">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge variant="secondary">{pack.industry}</Badge>
              <Badge variant="outline">{pack.location}</Badge>
            </div>

            <CardTitle className="text-2xl">{pack.jobType}</CardTitle>
          </div>

          <Badge className="w-fit">Content Pack</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div>
          <p className="mb-2 text-sm font-semibold">Source note</p>
          <p className="text-sm leading-7 text-muted-foreground">
            {pack.sourceNote}
          </p>
        </div>

        <Separator />

        <div className="grid gap-4 lg:grid-cols-2">
          <OutputBlock title="Google Business Profile Post" text={pack.googlePost} />
          <OutputBlock title="Facebook Post" text={pack.facebookPost} />
          <OutputBlock title="Instagram Caption" text={pack.instagramCaption} />
          <OutputBlock title="Short Reel Script" text={pack.reelScript} />
        </div>

        <Separator />

        <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-2xl border bg-muted/30 p-5">
            <p className="mb-2 text-sm font-semibold">FAQ Content</p>
            <p className="text-sm font-medium">{pack.faq.question}</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {pack.faq.answer}
            </p>
          </div>

          <div className="rounded-2xl border bg-muted/30 p-5">
            <p className="mb-3 text-sm font-semibold">Headline Options</p>
            <ul className="space-y-2">
              {pack.headlines.map((headline) => (
                <li
                  key={headline}
                  className="text-sm leading-6 text-muted-foreground"
                >
                  “{headline}”
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OutputBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border p-5">
      <p className="mb-2 text-sm font-semibold">{title}</p>
      <p className="text-sm leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}
