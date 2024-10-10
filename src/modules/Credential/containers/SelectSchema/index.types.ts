type SchemaRadioItems = {
  title: string;
  description?: string;
  value: string;
  disabled: boolean;
};

export interface SelectSchemaProps {
  schemaRadioItems: SchemaRadioItems[];
  selectedSchema: string;
  onSelectSchema: (schemaId: string) => void;
}
