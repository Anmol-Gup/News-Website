const show_news = (news) => {
    const container = document.querySelector('.container');

    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const content_div = document.createElement('div');
    content_div.setAttribute('class', 'content');

    const title = document.createElement('h2');
    title.innerText = news.title;

    const author = document.createElement('p');
    author.setAttribute('class', 'auth')
    news.author === null ? author.innerHTML = 'N/A' : author.innerHTML = news.author;

    const published = document.createElement('p');
    published.innerHTML = news.publishedAt === null ? 'N/A' : news.publishedAt;

    const published_auth = document.createElement('div');
    published_auth.setAttribute('class', 'box');

    published_auth.appendChild(author);
    published_auth.appendChild(published);

    const description = document.createElement('p');
    description.innerHTML = news.description === null ? 'N/A' : news.description;

    const source = document.createElement('p');
    source.innerHTML = news.source.name === null ? 'N/A' : news.source.name;

    const url = document.createElement('a');
    url.innerHTML = 'Read More';
    url.href = news.url;
    url.target = '_blank';

    const br = document.createElement('br');

    const img = document.createElement('img');
    img.src = news.urlToImage === null ? 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg' : news.urlToImage;
    img.alt = news.source.name;

    content_div.appendChild(title);
    content_div.appendChild(published_auth)
    // content_div.appendChild(author);
    content_div.appendChild(description);
    // content_div.appendChild(published);
    content_div.appendChild(source);
    content_div.appendChild(url);
    content_div.appendChild(br);

    card.appendChild(img);
    card.appendChild(content_div);
    container.appendChild(card);

}

const not_found=()=>{
    
    const error=document.createElement('div');
    error.setAttribute('class','not_found');

    const img=document.createElement('img');
    img.src='undraw_page_not_found_re_e9o6.svg';

    error.appendChild(img);
    document.querySelector('.categories').insertAdjacentElement('afterend',error);

}

const get_news = (category) => {

    category=typeof category!=='string'? category.innerText.toLowerCase():category.toLowerCase() 
    document.querySelector('.container').innerHTML = '';
    
    let buttons=document.getElementsByTagName('button');
    for(let button of buttons){
        if(button.id===category)
            button.classList.add('active');
        else
            button.classList.remove('active');
    }
    document.getElementById(category).classList.add('active');

    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=735f387318d24626b64fa9d533db0901`;
    console.log(url)
    fetch(url)
        .then(response => {
            return response.json()
        }).then(data => {
            if (data.status === 'ok') {
                for (let news of data.articles)
                    show_news(news);
            }
            else {
                //alert('Data is not available.')
                not_found();
            }
        });
}

window.onload = () => {
    const categories = document.querySelector('.categories');
    
    ['general', 'entertainment', 'health', 'science', 'sports', 'technology'].forEach(value => {
        categories.innerHTML += `<button id=${value} onclick='get_news(${value})'>${value.charAt(0).toUpperCase() + value.slice(1)}</button>`
    })
    get_news('general');
}