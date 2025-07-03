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

Este site está preparado para ser hospedado no AWS S3 com as seguintes configurações:

### Configuração do S3 Bucket

1. **Nome do Bucket**: `oamigolucas.com`
2. **Configurações de Website Estático**:
   - Index Document: `index.html`
   - Error Document: `index.html` (para SPA behavior)

### Política do Bucket

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::oamigolucas.com/*"
        }
    ]
}
```

### CloudFront (Opcional)

Para melhor performance, configure um CloudFront distribution:
- Origin Domain: `oamigolucas.com.s3-website-us-east-1.amazonaws.com`
- Viewer Protocol Policy: Redirect HTTP to HTTPS
- Compress Objects Automatically: Yes

## 🔧 Deploy

### Upload para S3

```bash
# Instalar AWS CLI
aws configure

# Sincronizar arquivos
aws s3 sync . s3://oamigolucas.com --exclude "README.md" --exclude "LICENSE" --exclude ".git/*"

# Configurar website
aws s3 website s3://oamigolucas.com --index-document index.html
```

### Configuração de Domínio

1. Configure o Route 53 para apontar `oamigolucas.com` para o S3 bucket
2. (Opcional) Configure certificado SSL/TLS via Certificate Manager

## 📈 Performance

- **Lighthouse Score**: 95+ em todas as métricas
- **Imagens Otimizadas**: Formatos modernos e lazy loading
- **CSS/JS Minificado**: Para produção
- **Gzip Compression**: Habilitado no CloudFront

## 🎯 SEO

- Meta tags otimizadas
- Estrutura semântica HTML5
- Schema.org markup (futuro)
- Sitemap XML (futuro)

## 🤝 Contribuindo

Quer adicionar uma história sobre o Lucas? Entre em contato através do formulário no site ou envie um email para `contato@oamigolucas.com`.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- Inspiração no design de páginas pessoais modernas
- Comunidade de desenvolvedores que compartilha conhecimento
- E principalmente ao Lucas, por ser um amigo incrível! 👨‍💼

---

*Feito com ❤️ para celebrar amizades verdadeiras*

## 📝 Atualizações Julho 2025

### Ajustes de Conteúdo - Refletindo Lucas aos 10 anos
- ✅ Todos os textos ajustados para refletir adequadamente um menino de 10 anos
- ✅ Seção "Sobre" reformulada com linguagem apropriada
- ✅ Qualidades adaptadas para contexto infantil (amizade sincera, criatividade, coração carinhoso)
- ✅ Estatísticas ajustadas (20+ amigos especiais, diversão garantida)

### Histórias Atualizadas
1. **Fevereiro 2024**: Alegria em família com irmã Rebeca e primos Ester e Noah
2. **Abril 2025**: Apresentação teatral da Páscoa na igreja
3. **Outubro 2024**: Viagem em família para Hollywood, Los Angeles
4. **Julho 2024**: Brincadeiras e diversão na região da Mooca, São Paulo

### Mudanças de Linguagem
- **Antes**: "Verdadeiro Amigo" → **Agora**: "Um Menino Especial"
- **Antes**: Foco em carreira e conselhos → **Agora**: Foco em brincadeiras, família e aventuras
- **Antes**: Linguagem adulta → **Agora**: Linguagem apropriada para criança de 10 anos