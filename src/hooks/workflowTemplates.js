import { useState, useEffect } from 'react';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

export function useWorkflowTemplate(
  { companyCode, state, product },
  documentType,
  templates,
  errorHandler
) {
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    async function getTemplate() {
      if (process.env.REACT_APP_FETCH_GANDALF_TEMPLATE === 'true') {
        try {
          const config = {
            // TODO this doesn't actually exist yet
            // service: 'document-configuration-manager',
            // method: 'GET',
            // path: 'templates',
            data: {
              companyCode,
              state,
              product,
              documentType,
              application: 'harmony-csr'
            }
          };

          const response = await serviceRunner.callService(
            config,
            'gandalfTemplate'
          );
          setTemplate(response.data.result);
        } catch (error) {
          errorHandler && errorHandler(error);
        }
      } else {
        const templateKey = `${companyCode}:${state}:${product}`;
        setTemplate(templates[templateKey]);
      }
    }
    if (companyCode && state && product) {
      getTemplate();
    }
  }, [companyCode, state, product, documentType, templates, errorHandler]);

  return template;
}
