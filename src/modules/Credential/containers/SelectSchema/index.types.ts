type SchemaRadioItems = {
  title: string;
  description?: string;
  value: string;
};

export interface SelectSchemaProps {
  schemaRadioItems: SchemaRadioItems[];
  selectedSchema: string;
  onSelectSchema: (schemaId: string) => void;
}