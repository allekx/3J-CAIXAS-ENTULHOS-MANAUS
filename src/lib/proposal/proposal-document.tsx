import type { ReactNode } from "react";
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ProposalPdfData } from "@/lib/proposal/to-proposal-pdf-data";

Font.registerHyphenationCallback((word) => {
  if (word.length <= 24) {
    return [word];
  }

  const chunks: string[] = [];

  for (let index = 0; index < word.length; index += 12) {
    chunks.push(word.slice(index, index + 12));
  }

  return chunks;
});

const colors = {
  black: "#111111",
  gold: "#C9A227",
  goldDark: "#A6851C",
  muted: "#52525B",
  border: "#D4D4D8",
  surface: "#FAFAFA",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.black,
    backgroundColor: colors.white,
    paddingTop: 36,
    paddingHorizontal: 42,
    paddingBottom: 64,
  },
  goldBar: {
    height: 8,
    backgroundColor: colors.gold,
    marginBottom: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    marginBottom: 14,
  },
  logo: {
    width: 92,
    height: 48,
    objectFit: "contain",
  },
  companyBlock: {
    flex: 1,
    minWidth: 0,
  },
  companyName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
    color: colors.black,
  },
  companyCity: {
    marginTop: 3,
    fontSize: 10,
    color: colors.muted,
  },
  contactLine: {
    marginTop: 2,
    fontSize: 9,
    color: colors.muted,
  },
  divider: {
    height: 2,
    backgroundColor: colors.gold,
    marginBottom: 16,
  },
  title: {
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    letterSpacing: 0.8,
    textAlign: "center",
    color: colors.black,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  metaCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 10,
  },
  metaLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.6,
    color: colors.goldDark,
    textTransform: "uppercase",
  },
  metaValue: {
    marginTop: 4,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  section: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    backgroundColor: colors.black,
    color: colors.white,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    letterSpacing: 0.8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    textTransform: "uppercase",
  },
  sectionBody: {
    padding: 10,
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 6,
  },
  lastRow: {
    marginBottom: 0,
  },
  field: {
    flex: 1,
    minWidth: 0,
  },
  fieldLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: colors.muted,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 10,
    lineHeight: 1.4,
  },
  valuesTable: {
    width: "100%",
  },
  valueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  valueLabel: {
    fontSize: 10,
    color: colors.black,
  },
  valueAmount: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    backgroundColor: colors.gold,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  totalLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.6,
  },
  totalAmount: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  notes: {
    fontSize: 10,
    lineHeight: 1.45,
  },
  footer: {
    position: "absolute",
    left: 42,
    right: 42,
    bottom: 28,
    borderTopWidth: 1,
    borderTopColor: colors.gold,
    paddingTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 8,
    color: colors.muted,
  },
});

function DataField({
  label,
  value,
  wide,
}: {
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <View style={wide ? [styles.field, { flex: 2 }] : styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  );
}

function Section({
  title,
  children,
  wrap = true,
}: {
  title: string;
  children: ReactNode;
  wrap?: boolean;
}) {
  return (
    <View style={styles.section} wrap={wrap}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

export function ProposalPdfDocument({ data }: { data: ProposalPdfData }) {
  return (
    <Document
      title={`Proposta ${data.protocol}`}
      author={data.companyName}
      subject="Proposta de alocação de caixa coletora"
      language="pt-BR"
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.goldBar} />

        <View style={styles.header}>
          {data.logoSrc ? (
            // eslint-disable-next-line jsx-a11y/alt-text -- react-pdf Image
            <Image src={data.logoSrc} style={styles.logo} />
          ) : null}
          <View style={styles.companyBlock}>
            <Text style={styles.companyName}>{data.companyName}</Text>
            <Text style={styles.companyCity}>{data.companyCity}</Text>
            {data.companyContacts.map((line) => (
              <Text key={line} style={styles.contactLine}>
                {line}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.title}>
          PROPOSTA DE ALOCAÇÃO DE CAIXA COLETORA
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Protocolo</Text>
            <Text style={styles.metaValue}>{data.protocol}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Data da proposta</Text>
            <Text style={styles.metaValue}>{data.proposalDate}</Text>
          </View>
        </View>

        <Section title="Cliente">
          <View style={[styles.row]}>
            <DataField label="Nome" value={data.customer.name} wide />
            <DataField label="Telefone" value={data.customer.phone} />
          </View>
          <View style={styles.row}>
            <DataField label="CPF/CNPJ" value={data.customer.document} />
          </View>
          <View style={styles.row}>
            <DataField label="Endereço" value={data.customer.address} wide />
          </View>
          <View style={[styles.row, styles.lastRow]}>
            <DataField label="Condomínio" value={data.customer.condominium} />
            <DataField label="Bairro" value={data.customer.neighborhood} />
            <DataField label="Cidade" value={data.customer.city} />
          </View>
        </Section>

        <Section title="Serviço">
          <View style={styles.row}>
            <DataField label="Tipo da caixa" value={data.service.boxType} />
            <DataField label="Tamanho" value={data.service.boxSize} />
            <DataField label="Quantidade" value={data.service.quantity} />
          </View>
          <View style={[styles.row, styles.lastRow]}>
            <DataField label="Período" value={data.service.period} />
            <DataField label="Entrega prevista" value={data.service.delivery} />
            <DataField label="Retirada prevista" value={data.service.pickup} />
          </View>
        </Section>

        <Section title="Valores" wrap={false}>
          <View style={styles.valuesTable}>
            <View style={styles.valueRow}>
              <Text style={styles.valueLabel}>Valor do serviço</Text>
              <Text style={styles.valueAmount}>{data.values.service}</Text>
            </View>
            <View style={styles.valueRow}>
              <Text style={styles.valueLabel}>Valor adicional</Text>
              <Text style={styles.valueAmount}>{data.values.additional}</Text>
            </View>
            <View style={styles.valueRow}>
              <Text style={styles.valueLabel}>Desconto</Text>
              <Text style={styles.valueAmount}>{data.values.discount}</Text>
            </View>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalAmount}>{data.values.total}</Text>
          </View>
        </Section>

        <Section title="Forma de pagamento" wrap={false}>
          <Text style={styles.fieldValue}>{data.paymentMethod}</Text>
        </Section>

        {data.notes ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observações</Text>
            <View style={styles.sectionBody}>
              <Text style={styles.notes}>{data.notes}</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            {data.companyName} • {data.companyCity}
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
