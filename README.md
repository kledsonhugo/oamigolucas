# O Amigo Lucas

Uma página web estática dedicada a celebrar as qualidades que fazem do Lucas um verdadeiro amigo.

## 🌟 Sobre o Projeto

Este site foi criado para destacar as qualidades especiais que fazem do Lucas uma pessoa querida por todos ao seu redor. A página apresenta histórias, qualidades e momentos especiais que demonstram como Lucas é um amigo excepcional.

## 🚀 Tecnologias Utilizadas

- HTML5 semântico
- CSS3 com Grid e Flexbox
- JavaScript vanilla
- Design responsivo
- Animações suaves
- Otimizado para performance

## 📱 Funcionalidades

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação Suave**: Scroll suave entre seções
- **Galeria de Fotos**: Galeria interativa com fotos reais do Lucas
- **Lightbox**: Visualização ampliada das fotos
- **Animações**: Elementos aparecem suavemente conforme o usuário rola a página
- **Formulário de Contato**: Interface para compartilhar histórias sobre Lucas
- **Menu Hambúrguer**: Navegação otimizada para dispositivos móveis
- **Lazy Loading**: Carregamento otimizado de imagens
- **Easter Egg**: Código Konami escondido para descobrir! 🎮

## 🎨 Design

O design foi inspirado em páginas pessoais modernas, com:
- Paleta de cores azul e branca
- Tipografia clara e legível (Inter)
- Cards interativos
- Gradientes suaves
- Efeitos hover elegantes

## 📂 Estrutura do Projeto

```
oamigolucas/
├── index.html          # Página principal com galeria de fotos
├── styles.css          # Estilos CSS com galeria responsiva
├── script.js           # JavaScript com lightbox e interações
├── README.md           # Este arquivo
├── images/             # Pasta com fotos reais do Lucas
│   ├── 20240622_174115.jpg  # Foto de perfil principal
│   ├── 20230725_132836.jpg  # Galeria de momentos
│   └── ...             # Muitas outras fotos!
└── LICENSE             # Licença do projeto
```

## 🌐 Hospedagem

Este site está hospedado no **Azure Storage Account** com static website hosting habilitado.

### Arquitetura Azure

- **Storage Account**: Azure Storage com static website hosting
- **Resource Group**: `oamigolucas-rg-dev`
- **Localização**: East US 2
- **Tipo de Storage**: Standard_LRS
- **Endpoint**: `https://{storage-account-name}.z13.web.core.windows.net`

### Infraestrutura como Código (IaC)

A infraestrutura é definida usando **Azure Bicep** no arquivo `infra/main.bicep`:

```bicep
// Storage Account para hospedar site estático
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: storageAccountName
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: true
    supportsHttpsTrafficOnly: true
    minimumTlsVersion: 'TLS1_2'
  }
}
```

## 🔧 Deploy

### Pré-requisitos

1. **Azure CLI**: `az --version`
2. **Azure Developer CLI**: `azd version`
3. **jq**: Para parsing JSON nos scripts
4. **Autenticação**: `az login`

### Deploy Automatizado

Use o script de deploy personalizado:

```bash
# Tornar o script executável
chmod +x deploy.sh

# Deploy no ambiente dev (padrão)
./deploy.sh

# Deploy em outro ambiente
./deploy.sh prod
```

### Deploy Manual

```bash
# 1. Criar Resource Group
az group create \
    --name "oamigolucas-rg-dev" \
    --location "eastus2"

# 2. Deploy da infraestrutura
az deployment group create \
    --resource-group "oamigolucas-rg-dev" \
    --template-file "./infra/main.bicep" \
    --parameters projectName="oamigolucas" environmentName="dev"

# 3. Habilitar static website hosting
az storage blob service-properties update \
    --account-name "{storage-account-name}" \
    --static-website \
    --index-document "index.html" \
    --404-document "index.html"

# 4. Upload dos arquivos
az storage blob upload-batch \
    --account-name "{storage-account-name}" \
    --destination '$web' \
    --source "." \
    --pattern "*.html" "*.css" "*.js" "*.txt" "*.xml"

# 5. Upload das imagens
az storage blob upload-batch \
    --account-name "{storage-account-name}" \
    --destination '$web/images' \
    --source "./images"
```

### Estrutura de Deployment

```
infra/
├── main.bicep              # Template Bicep principal
├── main.parameters.json    # Parâmetros de deployment
azure.yaml                  # Configuração Azure Developer CLI
deploy.sh                   # Script de deploy personalizado
package.json                # Metadados do projeto
```

### Configurações de Segurança

- **HTTPS Only**: Habilitado por padrão
- **TLS Mínimo**: 1.2
- **CORS**: Configurado para permitir acesso web
- **Public Access**: Habilitado apenas para blobs (necessário para static website)

## 📈 Monitoring e Logs

### Verificar Status do Site

```bash
# Verificar se o site está acessível
curl -I https://{storage-account-name}.z13.web.core.windows.net

# Listar arquivos no container $web
az storage blob list \
    --account-name "{storage-account-name}" \
    --container-name '$web' \
    --output table
```

### Logs e Metrics

- **Azure Monitor**: Métricas de storage disponíveis
- **Application Insights**: Pode ser adicionado para analytics
- **CDN**: Azure CDN pode ser configurado para melhor performance global

## 📈 Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **Imagens Otimizadas**: Formatos modernos e lazy loading
- **CSS/JS Minificado**: Para produção
- **Azure CDN**: Pode ser configurado para melhor performance global
- **Gzip Compression**: Suportado pelo Azure Storage
- **HTTPS**: Habilitado por padrão no Azure Storage

## 🎯 SEO

- Meta tags otimizadas
- Estrutura semântica HTML5
- Schema.org markup (futuro)
- Sitemap XML incluído
- Robots.txt configurado

## 🔄 CI/CD (Futuro)

Planejado para implementação:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Azure Storage
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      - name: Deploy to Storage
        run: ./deploy.sh prod
```

## 🤝 Contribuindo

Quer adicionar uma história sobre o Lucas? Entre em contato através do formulário no site ou envie um email para `oamigolucas@gmail.com`.

## 💰 Custos Estimados

### Azure Storage (Standard_LRS)
- **Storage**: ~$0.02/GB por mês
- **Transações**: ~$0.0004 por 10.000 transações
- **Bandwidth**: Primeiros 5GB gratuitos por mês
- **Estimativa mensal**: < $1 USD para um site pequeno

### Otimizações de Custo
- Uso de Standard_LRS (mais barato)
- Imagens otimizadas para reduzir storage
- Cache adequado para reduzir transações

## 🔧 Manutenção

### Atualizar Conteúdo

```bash
# Fazer alterações nos arquivos
# Executar deploy
./deploy.sh

# Ou upload específico
az storage blob upload \
    --account-name "{storage-account-name}" \
    --container-name '$web' \
    --name "index.html" \
    --file "./index.html" \
    --overwrite
```

### Backup

```bash
# Download de todos os arquivos
az storage blob download-batch \
    --source '$web' \
    --destination './backup' \
    --account-name "{storage-account-name}"
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Inspiração no design de páginas pessoais modernas
- Comunidade de desenvolvedores que compartilha conhecimento
- E principalmente ao Lucas, por ser um amigo incrível! 👨‍💼

---

*Feito com ❤️ para celebrar amizades verdadeiras*

## 📝 Atualizações Julho 2025

### Migração para Azure - 03/07/2025
- ✅ **Infraestrutura**: Migrado de AWS S3 para Azure Storage Account
- ✅ **IaC**: Implementado Azure Bicep para infraestrutura como código
- ✅ **Deployment**: Criado script automatizado (`deploy.sh`)
- ✅ **Configurações**: Azure Storage com static website hosting
- ✅ **Segurança**: HTTPS obrigatório, TLS 1.2 mínimo
- ✅ **CSS Fix**: Corrigido botão "Ver Mais Fotos" com cor mais visível

### Ajustes de Conteúdo - Refletindo Lucas aos 10 anos
- ✅ Todos os textos ajustados para refletir adequadamente um menino de 10 anos
- ✅ Seção "Sobre" reformulada com linguagem apropriada
- ✅ Qualidades adaptadas para contexto infantil (amizade sincera, criatividade, coração carinhoso)
- ✅ Estatísticas ajustadas (50+ amigos incríveis, diversão garantida)

### Histórias Atualizadas
1. **Fevereiro 2024**: Alegria em família com irmã Rebeca e primos Ester e Noah
2. **Abril 2025**: Apresentação teatral da Páscoa na igreja
3. **Outubro 2024**: Viagem em família para Hollywood, Los Angeles
4. **Julho 2024**: Brincadeiras e diversão na região da Mooca, São Paulo

### Mudanças de Linguagem
- **Antes**: "Verdadeiro Amigo" → **Agora**: "Um Menino Especial"
- **Antes**: Foco em carreira e conselhos → **Agora**: Foco em brincadeiras, família e aventuras
- **Antes**: Linguagem adulta → **Agora**: Linguagem apropriada para criança de 10 anos

### Arquivos de Infraestrutura
```
📁 Estrutura Completa do Projeto
├── 🌐 Frontend
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── images/
├── ☁️ Infraestrutura
│   ├── infra/main.bicep
│   ├── infra/main.parameters.json
│   ├── azure.yaml
│   └── deploy.sh
└── 📖 Documentação
    ├── README.md
    ├── LICENSE
    ├── robots.txt
    └── sitemap.xml
```