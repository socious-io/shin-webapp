import { SCHEMA_ATTRIBUTES } from 'src/constants/SCHEMA';
import { createSchema, deleteSchema, getSchemas, SchemaAttributeType, getSchema } from 'src/core/api';

import { AdaptorRes, SuccessRes } from '..';
import { Schema, SchemaReq, SchemaRes } from './index.types';

export const getSchemasAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<SchemaRes>> => {
  try {
    const { results, total } = await getSchemas({ page, limit });

    const items = results?.length
      ? results.map(schema => ({
          id: schema.id,
          name: schema.name,
          description: schema.description || '',
          deletable: schema.deleteable,
          disabled: schema.issue_disabled,
          created:
            (schema.created?.first_name || schema.created?.last_name
              ? `${schema.created.first_name} ${schema.created.last_name}`
              : schema.created?.username) || '',
          created_at: new Date(schema.created_at),
          attributes: schema.attributes.map(attribute => ({
            ...attribute,
            option: {
              value: attribute.type,
              label: SCHEMA_ATTRIBUTES.find(schema => schema.value === attribute.type)?.label,
            },
          })),
        }))
      : [];

    return {
      data: {
        items,
        page,
        limit,
        total,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting Schema List: ', error);
    return { data: null, error: 'Error in getting Schema List' };
  }
};

export const createSchemaAdaptor = async (payload: SchemaReq): Promise<AdaptorRes<Schema>> => {
  try {
    const newPayload = {
      ...payload,
      attributes: payload.attributes.map(p => ({
        ...p,
        type: p.option.value as SchemaAttributeType,
      })),
    };
    const schema = await createSchema(newPayload);
    const res = {
      ...schema,
      description: schema.description || '',
      deletable: schema.deleteable,
      disabled: schema.issue_disabled,
      created:
        (schema.created?.first_name || schema.created?.last_name
          ? `${schema.created.first_name} ${schema.created?.last_name}`
          : schema.created?.username) || '',
      attributes: schema.attributes.map(attribute => ({
        ...attribute,
        option: {
          value: attribute.type,
          label: SCHEMA_ATTRIBUTES.find(schema => schema.value === attribute.type)?.label,
        },
      })),
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in creating a Schema: ', error);
    return { data: null, error: 'Error in creating a Schema' };
  }
};

export const deleteSchemaAdaptor = async (schemaId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await deleteSchema(schemaId);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in deleting Schema ', error);
    return { data: null, error: 'Error in deleting Schema' };
  }
};

export const getSchemaAdaptor = async (id: string): Promise<AdaptorRes<Schema>> => {
  try {
    const schema = await getSchema(id);

    return {
      data: {
        ...schema,
        deletable: schema.deleteable,
        disabled: schema.issue_disabled,
        description: schema.description || '',
        created:
          (schema.created?.first_name || schema.created?.last_name
            ? `${schema.created.first_name} ${schema.created.last_name}`
            : schema.created?.username) || '',
        created_at: new Date(schema.created_at),
        attributes: schema.attributes.map(attribute => ({
          ...attribute,
          option: {
            value: attribute.type,
            label: SCHEMA_ATTRIBUTES.find(schema => schema.value === attribute.type)?.label,
          },
        })),
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting Schema: ', error);
    return { data: null, error: 'Error in getting Schema data' };
  }
};
