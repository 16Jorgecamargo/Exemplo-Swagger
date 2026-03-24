import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tooltip } from '@heroui/react';
import { Info, FileCode2, Folder, ChevronRight, ChevronDown } from 'lucide-react';

const files = {
  'src/routes/products.ts': `import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  // Retorna a lista de produtos
  res.json([{ id: 1, name: 'Produto 1' }]);
});

router.post('/', (req, res) => {
  // Cria um novo produto
  res.status(201).json({ message: 'Produto criado' });
});

router.get('/:id', (req, res) => {
  // Obtém um produto pelo ID
  res.json({ id: req.params.id, name: 'Produto 1' });
});

router.put('/:id', (req, res) => {
  // Atualiza um produto
  res.json({ message: 'Produto atualizado' });
});

router.delete('/:id', (req, res) => {
  // Deleta um produto
  res.status(204).send();
});

export default router;`,
  'src/routes/categories.ts': `import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  // Retorna a lista de categorias
  res.json([{ id: 1, name: 'Eletrônicos' }]);
});

export default router;`,
  'src/server.ts': `import express from 'express';
import swaggerUi from 'swagger-ui-express';
import productsRouter from './routes/products';
import categoriesRouter from './routes/categories';

// Importando o arquivo JSON diretamente!
// O código fica limpo e a documentação fica separada.
import swaggerDocument from './data/swagger.json';

const app = express();
app.use(express.json());

// Rotas da API
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

// Servindo o Swagger UI usando o arquivo JSON
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
  console.log('Documentação disponível em http://localhost:3000/api-docs');
});`
};

export default function FilesTab() {
  const [activeFile, setActiveFile] = useState<keyof typeof files>('src/server.ts');
  const [expandedFolders, setExpandedFolders] = useState({ src: true, routes: true });

  const toggleFolder = (folder: 'src' | 'routes') => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-emerald-400">Arquivos do Backend (IDE)</h2>
        <Tooltip>
          <Tooltip.Trigger>
            <div className="cursor-help text-neutral-400 hover:text-emerald-400 transition-colors">
              <Info size={20} />
            </div>
          </Tooltip.Trigger>
          <Tooltip.Content className="bg-neutral-800 text-neutral-100 p-3 rounded-lg max-w-xs text-sm border border-neutral-700">
            Nesta abordagem, o código-fonte fica limpo, sem comentários de documentação. O Swagger UI é alimentado diretamente pelo arquivo swagger.json importado no servidor.
          </Tooltip.Content>
        </Tooltip>
      </div>
      <p className="text-neutral-400 text-sm">
        Veja como o código-fonte do backend fica mais limpo quando o Swagger lê diretamente do arquivo JSON, separando a lógica da documentação.
      </p>
      
      <div className="flex border border-neutral-800 rounded-lg overflow-hidden h-[500px] bg-[#0a0a0a]">
        {/* Sidebar */}
        <div className="w-64 border-r border-neutral-800 bg-[#111111] p-2 flex flex-col gap-1 overflow-y-auto">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 px-2">Explorer</div>
          
          <div className="flex flex-col">
            <div 
              className="flex items-center gap-1 px-2 py-1 hover:bg-neutral-800 rounded cursor-pointer text-neutral-300"
              onClick={() => toggleFolder('src')}
            >
              {expandedFolders.src ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <Folder size={14} className="text-blue-400" />
              <span className="text-sm">src</span>
            </div>
            
            {expandedFolders.src && (
              <div className="flex flex-col ml-4 border-l border-neutral-800 pl-1">
                <div 
                  className="flex items-center gap-1 px-2 py-1 hover:bg-neutral-800 rounded cursor-pointer text-neutral-300"
                  onClick={() => toggleFolder('routes')}
                >
                  {expandedFolders.routes ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  <Folder size={14} className="text-blue-400" />
                  <span className="text-sm">routes</span>
                </div>
                
                {expandedFolders.routes && (
                  <div className="flex flex-col ml-4 border-l border-neutral-800 pl-1">
                    <div 
                      className={"flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm " + (activeFile === 'src/routes/products.ts' ? 'bg-neutral-800 text-emerald-400' : 'hover:bg-neutral-800 text-neutral-400')}
                      onClick={() => setActiveFile('src/routes/products.ts')}
                    >
                      <FileCode2 size={14} className="text-yellow-400" />
                      <span>products.ts</span>
                    </div>
                    <div 
                      className={"flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm " + (activeFile === 'src/routes/categories.ts' ? 'bg-neutral-800 text-emerald-400' : 'hover:bg-neutral-800 text-neutral-400')}
                      onClick={() => setActiveFile('src/routes/categories.ts')}
                    >
                      <FileCode2 size={14} className="text-yellow-400" />
                      <span>categories.ts</span>
                    </div>
                  </div>
                )}
                
                <div 
                  className={"flex items-center gap-2 px-2 py-1 rounded cursor-pointer text-sm mt-1 " + (activeFile === 'src/server.ts' ? 'bg-neutral-800 text-emerald-400' : 'hover:bg-neutral-800 text-neutral-400')}
                  onClick={() => setActiveFile('src/server.ts')}
                >
                  <FileCode2 size={14} className="text-yellow-400" />
                  <span>server.ts</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center bg-[#111111] border-b border-neutral-800">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0a] border-r border-neutral-800 text-sm text-emerald-400 border-t-2 border-t-emerald-400">
              <FileCode2 size={14} className="text-yellow-400" />
              {activeFile.split('/').pop()}
            </div>
          </div>
          <div className="flex-1 overflow-auto">
            <SyntaxHighlighter 
              language="typescript" 
              style={vscDarkPlus}
              customStyle={{ margin: 0, padding: '1.5rem', background: '#0a0a0a', height: '100%' }}
            >
              {files[activeFile]}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
