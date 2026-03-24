/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Tabs, Card, Tooltip } from "@heroui/react";
import { Info, FileJson, Cpu, MonitorPlay, CodeXml } from "lucide-react";
import JsonTab from "./components/JsonTab";
import CompilationTab from "./components/CompilationTab";
import VisualizationTab from "./components/VisualizationTab";
import FilesTab from "./components/FilesTab";

export default function App() {
  const [selected, setSelected] = useState<string>("files");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Swagger & OpenAPI Explorer
            </h1>
            <Tooltip>
              <Tooltip.Trigger>
                <div className="cursor-help text-neutral-400 hover:text-emerald-400 transition-colors">
                  <Info size={20} />
                </div>
              </Tooltip.Trigger>
              <Tooltip.Content className="bg-neutral-800 text-neutral-100 p-3 rounded-lg max-w-xs text-sm border border-neutral-700">
                O Swagger/OpenAPI é uma especificação para documentar APIs RESTful. Ele permite que humanos e computadores entendam as capacidades de um serviço sem acessar o código-fonte.
              </Tooltip.Content>
            </Tooltip>
          </div>
          <p className="text-neutral-400">
            Explore como a documentação de uma API é gerada, compilada e visualizada na prática.
          </p>
        </header>

        <div className="flex w-full flex-col">
          <Tabs 
            aria-label="Opções do Swagger" 
            selectedKey={selected} 
            onSelectionChange={(key) => setSelected(key.toString())}
            className="w-full"
          >
            <Tabs.List className="flex gap-6 border-b border-neutral-800 mb-4 pb-2 bg-transparent p-0">
              <Tabs.Tab id="files" className="cursor-pointer flex items-center gap-2 text-neutral-400 data-[selected=true]:text-emerald-400 pb-2 border-b-2 border-transparent data-[selected=true]:border-emerald-400 bg-transparent data-[selected=true]:bg-transparent shadow-none data-[selected=true]:shadow-none hover:bg-neutral-900/50 px-2 rounded-t-md">
                <CodeXml size={18} />
                <span>Código Fonte</span>
              </Tabs.Tab>
              <Tabs.Tab id="json" className="cursor-pointer flex items-center gap-2 text-neutral-400 data-[selected=true]:text-emerald-400 pb-2 border-b-2 border-transparent data-[selected=true]:border-emerald-400 bg-transparent data-[selected=true]:bg-transparent shadow-none data-[selected=true]:shadow-none hover:bg-neutral-900/50 px-2 rounded-t-md">
                <FileJson size={18} />
                <span>Especificação JSON</span>
              </Tabs.Tab>
              <Tabs.Tab id="compilation" className="cursor-pointer flex items-center gap-2 text-neutral-400 data-[selected=true]:text-emerald-400 pb-2 border-b-2 border-transparent data-[selected=true]:border-emerald-400 bg-transparent data-[selected=true]:bg-transparent shadow-none data-[selected=true]:shadow-none hover:bg-neutral-900/50 px-2 rounded-t-md">
                <Cpu size={18} />
                <span>Processo de Build</span>
              </Tabs.Tab>
              <Tabs.Tab id="visualization" className="cursor-pointer flex items-center gap-2 text-neutral-400 data-[selected=true]:text-emerald-400 pb-2 border-b-2 border-transparent data-[selected=true]:border-emerald-400 bg-transparent data-[selected=true]:bg-transparent shadow-none data-[selected=true]:shadow-none hover:bg-neutral-900/50 px-2 rounded-t-md">
                <MonitorPlay size={18} />
                <span>Interface Interativa</span>
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel id="files">
              <Card className="bg-neutral-900 border border-neutral-800">
                <Card.Content className="p-6">
                  <FilesTab />
                </Card.Content>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel id="json">
              <Card className="bg-neutral-900 border border-neutral-800">
                <Card.Content className="p-6">
                  <JsonTab />
                </Card.Content>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel id="compilation">
              <Card className="bg-neutral-900 border border-neutral-800">
                <Card.Content className="p-6">
                  <CompilationTab />
                </Card.Content>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel id="visualization">
              <Card className="bg-neutral-900 border border-neutral-800">
                <Card.Content className="p-6">
                  <VisualizationTab />
                </Card.Content>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
