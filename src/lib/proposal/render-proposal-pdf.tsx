import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { renderToBuffer } from "@react-pdf/renderer";
import { ProposalPdfDocument } from "@/lib/proposal/proposal-document";
import { proposalPdfFilename } from "@/lib/proposal/filename";
import {
  toProposalPdfData,
} from "@/lib/proposal/to-proposal-pdf-data";
import type { AllocationRequestRow } from "@/types/allocation-request";

async function readLogoDataUri() {
  const candidates = [
    path.join(process.cwd(), "public", "logos", "logo-3j-oficial.jpg"),
    path.join(process.cwd(), "public", "logos", "logo-3j.png"),
  ];

  for (const filePath of candidates) {
    try {
      const buffer = await readFile(filePath);
      const extension = path.extname(filePath).toLowerCase();
      const mime = extension === ".png" ? "image/png" : "image/jpeg";
      return `data:${mime};base64,${buffer.toString("base64")}`;
    } catch {
      continue;
    }
  }

  return null;
}

export async function renderProposalPdf(request: AllocationRequestRow) {
  const logoSrc = await readLogoDataUri();
  const data = toProposalPdfData(request, { logoSrc });
  const buffer = await renderToBuffer(<ProposalPdfDocument data={data} />);

  return {
    buffer,
    filename: proposalPdfFilename(request.protocol),
  };
}
