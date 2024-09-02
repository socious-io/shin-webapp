import { Schema, SchemaReq, SchemaRes } from './index.types';
import { AdaptorRes } from '..';

export const getSchemasAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<SchemaRes>> => {
  try {
    //TODO: API call response
    const res = [
      {
        id: '1',
        name: 'Educational Certificate',
        description: 'For academic degrees, diplomas, or certifications',
        created: '',
        created_at: new Date(),
        deletable: false,
        attributes: [{ name: 'Test', option: { label: 'Text', value: 'TEXT' }, description: 'attribute description' }],
      },
    ];

    const items = res.map(schema => ({
      id: schema.id,
      name: schema.name,
      description: schema.description,
      deletable: schema.deletable,
      created: schema.created,
      created_at: new Date(schema.created_at),
      attributes: schema.attributes.map(attribute => ({
        name: attribute.name,
        option: {
          value: attribute.option.value,
          label: attribute.option.label,
        },
        description: attribute.description,
      })),
    }));

    return {
      data: {
        items,
        page,
        limit,
        totalCount: 1,
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
    //TODO: API call and return response from API call OR success message
    const res = {
      id: '2',
      name: payload.name,
      description: payload?.description || '',
      created: '',
      created_at: new Date(),
      deletable: false,
      attributes: payload.attributes,
    };
    return { data: res, error: null };
  } catch (error) {
    console.error('Error in creating Schema: ', error);
    return { data: null, error: 'Error in creating Schema' };
  }
};

export const deleteSchemaAdaptor = async (schemaId: string): Promise<AdaptorRes> => {
  try {
    // TODO: API call and return response from API call OR success message
    return { data: null, message: 'succeed', error: null };
  } catch (error) {
    console.error('Error in deleting Schema ', error);
    return { data: null, error: 'Error in deleting Schema' };
  }
};
