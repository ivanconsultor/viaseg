import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://viasegcorretora.com.br';
const today = new Date().toISOString().split('T')[0];

// Páginas do site viaseg (HTML estático)
const pages = [
    { loc: '/',                           changefreq: 'monthly', priority: '1.0' },
    { loc: '/cotacao.html',               changefreq: 'monthly', priority: '0.8' },
    { loc: '/politica-privacidade.html',  changefreq: 'yearly',  priority: '0.3' },
    { loc: '/termos-uso.html',            changefreq: 'yearly',  priority: '0.3' },
    { loc: '/politica-cookies.html',      changefreq: 'yearly',  priority: '0.3' },
];

function generateSitemap() {
    console.log('Gerando sitemap para viasegcorretora.com.br...');

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    pages.forEach(page => {
        xml += `    <url>\n`;
        xml += `        <loc>${baseUrl}${page.loc}</loc>\n`;
        xml += `        <lastmod>${today}</lastmod>\n`;
        xml += `        <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `        <priority>${page.priority}</priority>\n`;
        xml += `    </url>\n`;
    });

    xml += `</urlset>\n`;

    const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
    fs.writeFileSync(publicPath, xml, 'utf8');
    console.log(`✅ Sitemap gerado em: ${publicPath}`);
}

generateSitemap();
