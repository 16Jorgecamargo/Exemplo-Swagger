import { useState, useEffect } from 'react';
import { Tooltip } from '@heroui/react';
import { Info, Terminal as TerminalIcon } from 'lucide-react';

const COMPILATION_STEPS = [
  "> npm run build:swagger",
  "Iniciando compilação da documentação OpenAPI...",
  "Lendo anotações e configurações...",
  "Encontrado 6 endpoints documentados.",
  "Validando esquemas e parâmetros...",
  "✓ Validação concluída com sucesso.",
  "Gerando arquivo swagger.json na pasta /dist/docs...",
  "✓ Arquivo swagger.json gerado com sucesso.",
  "A documentação está pronta para ser servida pelo Swagger UI."
];

export default function CompilationTab() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isCompiling, setIsCompiling] = useState(true);

  useEffect(() => {
    let currentStep = 0;
    let isActive = true;

    const interval = setInterval(() => {
      if (!isActive) return;
      
      if (currentStep < COMPILATION_STEPS.length) {
        const nextLog = COMPILATION_STEPS[currentStep];
        setLogs(prev => {
          // Evita duplicatas caso o React StrictMode ou re-renders causem chamadas extras
          if (prev.includes(nextLog)) return prev;
          return [...prev, nextLog];
        });
        currentStep++;
      } else {
        setIsCompiling(false);
        clearInterval(interval);
      }
    }, 800);

    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-emerald-400">Processo de Compilação</h2>
        <Tooltip>
          <Tooltip.Trigger>
            <div className="cursor-help text-neutral-400 hover:text-emerald-400 transition-colors">
              <Info size={20} />
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content className="bg-neutral-800 text-neutral-100 p-3 rounded-lg max-w-xs text-sm border border-neutral-700">
            Muitos frameworks (como NestJS ou Express com swagger-autogen) geram o JSON do OpenAPI automaticamente lendo comentários ou decoradores no seu código durante a compilação.
          </Tooltip.Content>
        </Tooltip>
      </div>
      <p className="text-neutral-400 text-sm">
        Veja como o JSON do OpenAPI é gerado a partir do código-fonte do backend.
      </p>
      
      <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg p-4 font-mono text-sm shadow-inner relative overflow-hidden min-h-[300px]">
        <div className="flex items-center gap-2 mb-4 text-neutral-500 border-b border-neutral-800 pb-2">
          <TerminalIcon size={16} />
          <span>Terminal - bash</span>
        </div>
        
        <div className="flex flex-col gap-2">
          {logs.map((log, index) => (
            <div 
              key={index} 
              className={`${
                log?.startsWith?.('>') ? 'text-cyan-400 font-bold' : 
                log?.startsWith?.('✓') ? 'text-emerald-400' : 
                'text-neutral-300'
              }`}
            >
              {log}
            </div>
          ))}
          {isCompiling && (
            <div className="flex items-center gap-2 text-neutral-500 mt-2">
              <span className="animate-pulse">_</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
