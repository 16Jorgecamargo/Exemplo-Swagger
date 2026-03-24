import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Tooltip } from '@heroui/react';
import { Info, FileCode2, Folder, ChevronRight, ChevronDown } from 'lucide-react';

const cleanFiles = {
  'src/routes/products.ts': `import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Produto 1' }]);
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Produto criado' });
});

router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Produto 1' });
});

router.put('/:id', (req, res) => {
  res.json({ message: 'Produto atualizado' });
});

router.delete('/:id', (req, res) => {
  res.status(204).send();
});

export default router;`,
  'src/routes/categories.ts': `import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Eletrônicos' }]);
});

export default router;`,
  'src/server.ts': `import express from 'express';
import swaggerUi from 'swagger-ui-express';
import productsRouter from './routes/products';
import categoriesRouter from './routes/categories';
import swaggerDocument from './data/swagger.json';

const app = express();
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
  console.log('Documentação disponível em http://localhost:3000/api-docs');
});`
};

const commentedFiles = {
  'src/routes/products.ts': `// Importa o Router do pacote express
import { Router } from 'express';
// Instancia o router chamando a função Router()
const router = Router();

// Rota GET para a raiz de produtos
// O req é a requisição e o res é a resposta
router.get('/', (req, res) => {
  // Cria um array com um objeto dentro
  // O objeto tem id 1 e nome Produto 1
  // Usa o res.json para retornar o array em formato JSON
  res.json([{ id: 1, name: 'Produto 1' }]);
});

// Rota POST para criar um produto
router.post('/', (req, res) => {
  // Retorna o status 201 que significa criado
  // E manda uma mensagem de sucesso
  res.status(201).json({ message: 'Produto criado' });
});

// Rota GET passando o id na URL
router.get('/:id', (req, res) => {
  // Pega o id dos parâmetros da requisição
  // E retorna um JSON com o id e o nome do produto
  res.json({ id: req.params.id, name: 'Produto 1' });
});

// Rota PUT para atualizar passando o id
router.put('/:id', (req, res) => {
  // Retorna uma mensagem dizendo que atualizou
  res.json({ message: 'Produto atualizado' });
});

// Rota DELETE para deletar passando o id
router.delete('/:id', (req, res) => {
  // Retorna o status 204 que significa sem conteúdo
  // E envia a resposta vazia
  res.status(204).send();
});

// Exporta o router para usar em outros arquivos
export default router;`,
  'src/routes/categories.ts': `// Importa o Router do express
import { Router } from 'express';
// Cria a variável router
const router = Router();

// Rota GET para listar as categorias
router.get('/', (req, res) => {
  // Retorna um JSON com a categoria Eletrônicos
  res.json([{ id: 1, name: 'Eletrônicos' }]);
});

// Exporta o router como padrão
export default router;`,
  'src/server.ts': `// Importa o express da biblioteca express
import express from 'express';
// Importa o swaggerUi
import swaggerUi from 'swagger-ui-express';
// Importa as rotas de produtos
import productsRouter from './routes/products';
// Importa as rotas de categorias
import categoriesRouter from './routes/categories';

// Importa o arquivo JSON do swagger
import swaggerDocument from './data/swagger.json';

// Cria o app do express
const app = express();
// Diz pro app usar JSON
app.use(express.json());

// Diz pro app usar as rotas de produtos no caminho /api/products
app.use('/api/products', productsRouter);
// Diz pro app usar as rotas de categorias no caminho /api/categories
app.use('/api/categories', categoriesRouter);

// Cria a rota /api-docs para o swagger
// Usa o swaggerUi.serve e o swaggerUi.setup passando o documento
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Faz o app escutar na porta 3000
app.listen(3000, () => {
  // Imprime no console que o servidor tá rodando
  console.log('Servidor rodando na porta 3000');
  // Imprime no console o link da documentação
  console.log('Documentação disponível em http://localhost:3000/api-docs');
});`
};

export default function FilesTab() {
  const [activeFile, setActiveFile] = useState<keyof typeof cleanFiles>('src/server.ts');
  const [expandedFolders, setExpandedFolders] = useState({ src: true, routes: true });
  const [showClean, setShowClean] = useState(false);

  const toggleFolder = (folder: 'src' | 'routes') => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const currentFiles = showClean ? cleanFiles : commentedFiles;

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-emerald-400">Arquivos do Backend (IDE)</h2>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowClean(!showClean)}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-neutral-950 ${
              showClean ? 'bg-emerald-500' : 'bg-neutral-700'
            }`}
            title={showClean ? "Mostrar código com comentários" : "Mostrar código limpo"}
          >
            <span
              className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                showClean ? 'translate-x-4' : 'translate-x-1'
              }`}
            />
          </button>

          <Tooltip>
            <Tooltip.Trigger>
              <div className="cursor-help text-neutral-400 hover:text-emerald-400 transition-colors">
                <Info size={20} />
              </div>
            </Tooltip.Trigger>
            <Tooltip.Content className="bg-neutral-800 text-neutral-100 p-3 rounded-lg max-w-xs text-sm border border-neutral-700">
              {showClean 
                ? "Nesta abordagem, o código-fonte fica limpo, sem comentários desnecessários, focando apenas na lógica de negócio."
                : "Nesta abordagem, o código está cheio de comentários redundantes que apenas descrevem o que o código já diz, uma prática comum entre iniciantes."}
            </Tooltip.Content>
          </Tooltip>
        </div>
      </div>
      
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
              {currentFiles[activeFile]}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}
