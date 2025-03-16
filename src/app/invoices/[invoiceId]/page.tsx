import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { auth } from "@clerk/nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { AVAILABLE_STATUSES } from "@/data/invoices";
import { updateStatusAction } from "@/lib/actions";

type PageProps = {
  params: {
    invoiceId: string;
  };
};

const InvoicePage = async ({ params }: PageProps) => {
  const { userId } = await auth();
  if (!userId) return;

  const invoiceId = parseInt(params.invoiceId);

  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  const [result] = await db
    .select()
    .from(Invoices)
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  if (!result) {
    notFound();
  }

  return (
    <div>
      <Container>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">
            Invoice #{invoiceId}{" "}
            <Badge
              className={cn(
                "rounded-full text-white capitalize",
                result.status === "open" && "bg-green-500",
                result.status === "paid" && "bg-green-600",
                result.status === "void" && "bg-zinc-700",
                result.status === "uncollectible" && "bg-red-600"
              )}
            >
              {result.status}
            </Badge>
          </h1>

          <p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="flex items-center gap-2"
                  variant="outline"
                  type="button"
                >
                  Change Status
                  <ChevronDown className="w-4 h-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUSES.map((status) => {
                  return (
                    <DropdownMenuItem key={status.id}>
                      <form action={updateStatusAction}>
                        <input type="hidden" name="id" value={invoiceId} />
                        <input type="hidden" name="status" value={status.id} />
                        <button type="submit">{status.label}</button>
                      </form>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </p>
        </div>
        <p className="text-3xl mb-3">${(result.value / 100).toFixed(2)}</p>

        <ul className="mt-10">
          <p className="font-bold mb-2 text-lg">Billing Details</p>
          <li>Invoice ID: {invoiceId}</li>
          <li>
            Invoice Date: {new Date(result.createTs).toLocaleDateString()}
          </li>
          <li>Billing Name: John Doe</li>
          <li>Billing Email: john@gmail.com</li>
        </ul>
      </Container>
    </div>
  );
};

export default InvoicePage;
