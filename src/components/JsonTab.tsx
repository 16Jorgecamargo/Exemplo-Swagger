import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import swaggerData from '../data/swagger.json';
import { Tooltip } from '@heroui/react';
import { Info } from 'lucide-react';

export default function JsonTab() {
  const jsonString = JSON.stringify(swaggerData, null, 2);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-emerald-400">Especificação OpenAPI (JSON)</h2>
        <Tooltip>
          <Tooltip.Trigger>
            <div className="cursor-help text-neutral-400 hover:text-emerald-400 transition-colors">
              <Info size={20} />
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content className="bg-neutral-800 text-neutral-100 p-3 rounded-lg max-w-xs text-sm border border-neutral-700">
            Este é o arquivo JSON gerado que descreve todos os endpoints, parâmetros e respostas da sua API. O Swagger UI usa este arquivo para renderizar a interface visual.
          </Tooltip.Content>
        </Tooltip>
      </div>
      <p className="text-neutral-400 text-sm">
        O OpenAPI (anteriormente Swagger) é uma especificação independente de linguagem para descrever APIs REST.
        Abaixo está o exemplo do nosso mini backend de E-commerce com 6 endpoints detalhados.
      </p>
      <div className="rounded-lg overflow-hidden border border-neutral-800">
        <SyntaxHighlighter 
          language="json" 
          style={vscDarkPlus}
          customStyle={{ margin: 0, padding: '1.5rem', background: '#0a0a0a' }}
        >
          {jsonString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
