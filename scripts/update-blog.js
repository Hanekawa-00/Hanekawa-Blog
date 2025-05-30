const fs = require('fs');
const path = require('path');

/**
 * 自动更新博客侧边栏配置和首页最新文章脚本
 * 功能：
 * 1. 扫描 docs/blog/ 目录下的所有.md文件
 * 2. 自动更新config.js中的侧边栏配置
 * 3. 自动更新首页的最新文章列表
 */

// 配置路径
const BLOG_DIR = path.join(__dirname, '../docs/blog');
const CONFIG_PATH = path.join(__dirname, '../docs/.vuepress/config.js');
const INDEX_PATH = path.join(__dirname, '../docs/index.md');

/**
 * 解析Markdown文件的frontmatter
 * @param {string} content 文件内容
 * @returns {object} 解析后的frontmatter对象
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return {};
  }
  
  const frontmatterText = match[1];
  const frontmatter = {};
  
  // 简单解析YAML格式的frontmatter
  const lines = frontmatterText.split('\n');
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^['"]|['"]$/g, '');
      frontmatter[key] = value;
    }
  });
  
  return frontmatter;
}

/**
 * 提取文章描述
 * @param {string} content 文件内容
 * @param {number} maxLength 最大长度
 * @returns {string} 文章描述
 */
function extractDescription(content, maxLength = 100) {
  // 移除frontmatter
  const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n/, '');
  
  // 移除Markdown标记，提取纯文本
  let description = contentWithoutFrontmatter
    .replace(/^#+ .*/gm, '') // 移除标题
    .replace(/\*\*(.*?)\*\*/g, '$1') // 移除粗体标记
    .replace(/\*(.*?)\*/g, '$1') // 移除斜体标记
    .replace(/`(.*?)`/g, '$1') // 移除行内代码标记
    .replace(/```[\s\S]*?```/g, '') // 移除代码块
    .replace(/:::(.*?):::/gs, '') // 移除VuePress容器
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 移除链接，保留文本
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 移除图片
    .replace(/\n+/g, ' ') // 换行转空格
    .replace(/\s+/g, ' ') // 多个空格合并
    .trim();
  
  // 截取指定长度
  if (description.length > maxLength) {
    description = description.substring(0, maxLength) + '...';
  }
  
  return description || '暂无描述';
}

/**
 * 获取文件的创建时间
 * @param {string} filePath 文件路径
 * @returns {Date} 创建时间
 */
function getFileCreationTime(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.birthtime || stats.mtime;
  } catch (error) {
    console.warn(`无法获取文件 ${filePath} 的创建时间:`, error.message);
    return new Date();
  }
}

/**
 * 格式化日期
 * @param {Date} date 日期对象
 * @returns {string} 格式化的日期字符串
 */
function formatDate(date) {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

/**
 * 扫描博客目录，获取所有博客文章信息
 * @returns {Array} 博客文章信息数组
 */
function scanBlogPosts() {
  console.log('正在扫描博客目录:', BLOG_DIR);
  
  if (!fs.existsSync(BLOG_DIR)) {
    console.error('博客目录不存在:', BLOG_DIR);
    return [];
  }
  
  const files = fs.readdirSync(BLOG_DIR);
  const posts = [];
  
  files.forEach(file => {
    // 跳过README.md和非.md文件
    if (file === 'README.md' || !file.endsWith('.md')) {
      return;
    }
    
    const filePath = path.join(BLOG_DIR, file);
    const relativePath = `/blog/${file}`;
    
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const frontmatter = parseFrontmatter(content);
      const creationTime = getFileCreationTime(filePath);
      
      // 从frontmatter或文件名获取标题
      const title = frontmatter.title || 
                    frontmatter.name || 
                    file.replace('.md', '').replace(/[-_]/g, ' ');
      
      // 从frontmatter获取日期，如果没有则使用文件创建时间
      let date = creationTime;
      if (frontmatter.date) {
        const parsedDate = new Date(frontmatter.date);
        if (!isNaN(parsedDate.getTime())) {
          date = parsedDate;
        }
      }
      
      // 提取文章描述
      const description = extractDescription(content, 80);
      
      posts.push({
        file: file,
        path: relativePath,
        title: title,
        date: date,
        description: description,
        frontmatter: frontmatter
      });
      
      console.log(`发现文章: ${title} (${file})`);
    } catch (error) {
      console.warn(`读取文件 ${file} 时出错:`, error.message);
    }
  });
  
  // 按日期倒序排列（最新的在前面）
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  
  console.log(`共发现 ${posts.length} 篇文章`);
  return posts;
}

/**
 * 更新首页的最新文章列表
 * @param {Array} posts 博客文章信息数组
 * @returns {boolean} 更新是否成功
 */
function updateHomepageLatestPosts(posts) {
  console.log('正在更新首页最新文章列表:', INDEX_PATH);
  
  if (!fs.existsSync(INDEX_PATH)) {
    console.error('首页文件不存在:', INDEX_PATH);
    return false;
  }
  
  try {
    let indexContent = fs.readFileSync(INDEX_PATH, 'utf-8');
    
    // 获取最新的3-5篇文章
    const latestPosts = posts.slice(0, 5);
    
    // 生成最新文章列表的Markdown内容
    let latestPostsContent = '';
    if (latestPosts.length > 0) {
      latestPostsContent = latestPosts.map(post => {
        const formattedDate = formatDate(post.date);
        return `- [${post.title}](${post.path}) - ${formattedDate}\n  \n  *${post.description}*`;
      }).join('\n\n');
    } else {
      latestPostsContent = '暂无文章，请添加您的第一篇博客文章...';
    }
    
    // 使用注释标记来精确替换最新文章区域
    const startMarker = '<!-- 最新文章开始 -->';
    const endMarker = '<!-- 最新文章结束 -->';
    
    const startIndex = indexContent.indexOf(startMarker);
    const endIndex = indexContent.indexOf(endMarker);
    
    if (startIndex === -1 || endIndex === -1) {
      console.error('无法找到最新文章区域标记');
      console.log('请确保首页包含以下标记：');
      console.log(startMarker);
      console.log('...');
      console.log(endMarker);
      return false;
    }
    
    // 构建新的最新文章区域内容
    const newLatestSection = `${startMarker}
## 📝 最新文章

${latestPostsContent}

${endMarker}`;
    
    // 替换内容
    const newIndexContent = 
      indexContent.substring(0, startIndex) + 
      newLatestSection + 
      indexContent.substring(endIndex + endMarker.length);
    
    // 写入更新后的首页内容
    fs.writeFileSync(INDEX_PATH, newIndexContent, 'utf-8');
    console.log('首页最新文章列表更新成功！');
    return true;
    
  } catch (error) {
    console.error('更新首页最新文章列表时出错:', error.message);
    return false;
  }
}

/**
 * 更新config.js文件中的侧边栏配置
 * @param {Array} posts 博客文章信息数组
 */
function updateConfig(posts) {
  console.log('正在更新配置文件:', CONFIG_PATH);
  
  if (!fs.existsSync(CONFIG_PATH)) {
    console.error('配置文件不存在:', CONFIG_PATH);
    return false;
  }
  
  try {
    let configContent = fs.readFileSync(CONFIG_PATH, 'utf-8');
    
    // 生成新的侧边栏children数组
    const sidebarItems = posts.map(post => `            '${post.path}',`).join('\n');
    
    // 更精确的正则表达式来匹配 /blog/ 配置块
    const blogSidebarRegex = /('\/blog\/'\s*:\s*\[\s*\{\s*text\s*:\s*['"]博客文章['"],?\s*children\s*:\s*\[)([\s\S]*?)(\s*\],?\s*\},?\s*\],?)/;
    
    const match = configContent.match(blogSidebarRegex);
    if (match) {
      const newChildren = sidebarItems ? `\n${sidebarItems}\n          ` : '\n            // 文章列表将由 npm run update-blog 自动生成\n          ';
      const replacement = match[1] + newChildren + match[3];
      configContent = configContent.replace(blogSidebarRegex, replacement);
    } else {
      console.error('无法找到博客侧边栏配置块');
      console.log('请确保config.js中存在以下格式的配置：');
      console.log(`'/blog/': [
        {
          text: '博客文章',
          children: [
            // 内容
          ],
        },
      ],`);
      return false;
    }
    
    // 写入更新后的配置
    fs.writeFileSync(CONFIG_PATH, configContent, 'utf-8');
    console.log('配置文件更新成功！');
    return true;
    
  } catch (error) {
    console.error('更新配置文件时出错:', error.message);
    return false;
  }
}

/**
 * 主函数
 */
function main() {
  console.log('开始更新博客配置和首页...');
  console.log('='.repeat(60));
  
  // 扫描博客文章
  const posts = scanBlogPosts();
  
  if (posts.length === 0) {
    console.log('没有发现博客文章，将清空侧边栏配置和首页最新文章');
  }
  
  // 更新首页最新文章列表
  console.log('\n' + '-'.repeat(40));
  const homepageSuccess = updateHomepageLatestPosts(posts);
  
  // 更新侧边栏配置
  console.log('\n' + '-'.repeat(40));
  const configSuccess = updateConfig(posts);
  
  console.log('\n' + '='.repeat(60));
  
  if (homepageSuccess && configSuccess) {
    console.log('✅ 所有更新完成！');
    if (posts.length > 0) {
      console.log('\n📝 文章列表（按日期倒序）:');
      posts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title} (${formatDate(post.date)})`);
        console.log(`   📄 ${post.file}`);
        console.log(`   📝 ${post.description}`);
        console.log('');
      });
    }
  } else {
    console.log('❌ 部分更新失败！');
    if (!homepageSuccess) console.log('  - 首页最新文章列表更新失败');
    if (!configSuccess) console.log('  - 侧边栏配置更新失败');
    process.exit(1);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}

module.exports = {
  scanBlogPosts,
  updateConfig,
  updateHomepageLatestPosts,
  parseFrontmatter,
  extractDescription
};