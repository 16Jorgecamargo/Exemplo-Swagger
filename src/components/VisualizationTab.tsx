import React, { createContext, useContext } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import swaggerData from '../data/swagger.json';
import { Tooltip } from '@heroui/react';
import { Info } from 'lucide-react';

// Contexto para passar a resposta esperada da Operação para o Botão
const ExpectedResponseContext = createContext<string>("Dados simulados");

// Plugin customizado para adicionar Tooltip no botão "Try it out"
const TryItOutTooltipPlugin = () => {
  return {
    wrapComponents: {
      Operation: (Original: any) => (props: any) => {
        // Extrai a resposta de sucesso (200 ou 201) da operação atual
        const operation = props.operation;
        const responses = operation?.get('responses');
        let expectedResponse = "O servidor retornará dados simulados (Mock).";
        
        if (responses) {
          const successRes = responses.get('200') || responses.get('201');
          if (successRes) {
            const description = successRes.get('description');
            if (description) {
              expectedResponse = `Retorno esperado: ${description}`;
            }
          } else if (responses.get('204')) {
            expectedResponse = "Retorno esperado: Sem conteúdo (204 No Content)";
          }
        }

        return (
          <ExpectedResponseContext.Provider value={expectedResponse}>
            <Original {...props} />
          </ExpectedResponseContext.Provider>
        );
      },
      TryItOutButton: (Original: any) => (props: any) => {
        const expectedResponse = useContext(ExpectedResponseContext);
        return (
          <div title={expectedResponse}>
            <Original {...props} />
          </div>
        );
      },
      Execute: (Original: any) => (props: any) => {
        const expectedResponse = useContext(ExpectedResponseContext);
        return (
          <div title={`Clique para executar. ${expectedResponse}`}>
            <Original {...props} />
          </div>
        );
      }
    }
  };
};

export default function VisualizationTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-emerald-400">Swagger UI (Visualização)</h2>
        <Tooltip>
          <Tooltip.Trigger>
            <div className="cursor-help text-neutral-400 hover:text-emerald-400 transition-colors">
              <Info size={20} />
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content className="bg-neutral-800 text-neutral-100 p-3 rounded-lg max-w-xs text-sm border border-neutral-700">
            O Swagger UI lê o arquivo JSON do OpenAPI e cria uma interface interativa. Desenvolvedores podem ver os endpoints, parâmetros, e até mesmo testar as requisições diretamente do navegador.
          </Tooltip.Content>
        </Tooltip>
      </div>
      
      <div className="bg-white rounded-lg overflow-hidden border border-neutral-800 p-4 swagger-dark-wrapper">
        <SwaggerUI 
          spec={swaggerData} 
          plugins={[TryItOutTooltipPlugin]}
        />
      </div>
    </div>
  );
}
