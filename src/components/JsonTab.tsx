import { useState } from 'react';
import swaggerData from '../data/swagger.json';
import { Tooltip } from '@heroui/react';
import { Info, ChevronRight, ChevronDown } from 'lucide-react';

type JsonNodeProps = {
  data: any;
  name?: string;
  isRoot?: boolean;
  initiallyOpen?: boolean;
  isLast?: boolean;
};

function JsonNode({ data, name, isRoot = false, initiallyOpen = false, isLast = true }: JsonNodeProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const isObject = data !== null && typeof data === 'object' && !Array.isArray(data);
  const isArray = Array.isArray(data);
  const isComplex = isObject || isArray;

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (!isComplex) {
    const valueColor = typeof data === 'string' ? 'text-[#ce9178]' : typeof data === 'number' ? 'text-[#b5cea8]' : 'text-[#569cd6]';
    const formattedValue = typeof data === 'string' ? `"${data}"` : String(data);
    
    return (
      <div className="pl-6 font-mono text-sm leading-relaxed">
        {name && <span className="text-[#9cdcfe]">"{name}"</span>}
        {name && <span className="text-neutral-400">: </span>}
        <span className={valueColor}>{formattedValue}</span>
        {!isLast && <span className="text-neutral-400">,</span>}
      </div>
    );
  }

  const bracketOpen = isArray ? '[' : '{';
  const bracketClose = isArray ? ']' : '}';
  const keys = Object.keys(data);
  const isEmpty = keys.length === 0;

  if (isEmpty) {
    return (
      <div className="pl-6 font-mono text-sm leading-relaxed text-neutral-400">
        {name && <span className="text-[#9cdcfe]">"{name}"</span>}
        {name && <span>: </span>}
        {bracketOpen}{bracketClose}{!isLast && ','}
      </div>
    );
  }

  return (
    <div className="font-mono text-sm leading-relaxed">
      <div className="flex items-start group cursor-pointer hover:bg-neutral-800/50 rounded px-1 -ml-1 w-fit" onClick={toggle}>
        <div className="w-5 flex-shrink-0 flex justify-center items-center text-neutral-500 group-hover:text-neutral-300 mt-0.5">
          {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </div>
        <div>
          {name && <span className="text-[#9cdcfe]">"{name}"</span>}
          {name && <span className="text-neutral-400">: </span>}
          <span className="text-neutral-400">{bracketOpen}</span>
          {!isOpen && (
            <span className="text-neutral-500 px-1">...</span>
          )}
          {!isOpen && (
            <span className="text-neutral-400">{bracketClose}{!isLast && ','}</span>
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="pl-4 border-l border-neutral-800/50 ml-2.5">
          {keys.map((key, index) => (
            <JsonNode 
              key={key} 
              name={isArray ? undefined : key} 
              data={data[key as keyof typeof data]} 
              isLast={index === keys.length - 1}
              initiallyOpen={isRoot && key === 'info'}
            />
          ))}
        </div>
      )}
      
      {isOpen && (
        <div className="pl-6 text-neutral-400">
          {bracketClose}{!isLast && ','}
        </div>
      )}
    </div>
  );
}

export default function JsonTab() {
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
      <div className="rounded-lg overflow-auto border border-neutral-800 bg-[#0a0a0a] p-4 max-h-[600px]">
        <JsonNode data={swaggerData} isRoot={true} initiallyOpen={true} />
      </div>
    </div>
  );
}
