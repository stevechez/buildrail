import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewProjectForm } from "@/components/dashboard/NewProjectForm";

export default function NewProjectPage() {
  return (
    <div className="max-w-lg">
      <h1 className="font-[Space_Grotesk] text-2xl font-semibold text-white">New project</h1>
      <p className="mt-1 text-sm text-muted">The client phone here also becomes their portal contact.</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-sm text-muted">Details</CardTitle>
        </CardHeader>
        <CardContent>
          <NewProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
