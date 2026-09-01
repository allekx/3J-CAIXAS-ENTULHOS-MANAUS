export function proposalPdfFilename(protocol: string) {
  const safe = protocol.replace(/[^A-Za-z0-9-]/g, "");
  return `proposta-3j-${safe}.pdf`;
}
