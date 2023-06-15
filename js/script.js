'use strict';
/* document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  }); */
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
  console.log('Link was clicked!');
  
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    //console.log('clickedElement (with plus): ' + clickedElement);
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active')
  
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles){
        activeArticle.classList.remove('active')
    }
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);
  
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
  
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  }
  

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

   function generateTitleLinks(customSelector = ''){
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector)
    titleList.innerHTML = '';
   /* find all the articles and save them to variable: articles */
      let html = '';
    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    for(let article of articles){
      /* get the article id */
      const articleId = article.getAttribute('id');
  
      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  
      /* get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log(linkHTML);
      /* create HTML of the link */
      // titleList.insertAdjacentHTML('beforeend', linkHTML);
      /* insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    console.log(links);
    
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }


  }
  
  generateTitleLinks(); 


  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
    /* START LOOP: for every article: */
    for(let article of articles ){
  
      /* find tags wrapper */
      const tagsWrap = article.querySelector(optArticleTagsSelector);
  
      /* make html variable with empty string */
      let html = "";
  
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
  
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
  
      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        /* generate HTML of the link */
        const LinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';

  
        /* add generated code to html variable */
        html = html + LinkHTML;
        
  
      /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrap.innerHTML = html;
  
    /* END LOOP: for every article: */
    }
  }
  
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    
    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  
    /* START LOOP: for each active tag link */
    for(let taglink of activeTagLinks){
  
      /* remove class active */
      taglink.classList.remove('active');
  
    /* END LOOP: for each active tag link */
    }
  
    /* find all tag links with "href" attribute equal to the "href" constant */
    const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  
    /* START LOOP: for each found tag link */
    for(let foundTagLink of foundTagLinks){
  
      /* add class active */
      foundTagLink.classList.add('active')
  
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  
    /* START LOOP: for each link */
    for(let tagLink of tagLinks){
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
    }
  }
  
  addClickListenersToTags();

  function genereteAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);

    for(let article of articles ){
      const authorWrap = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const articleAuthor = article.getAttribute('data-author');
      const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      html = html + linkHTML;
    
    authorWrap.innerHTML = html;
    }
  }
  genereteAuthors();
    function authorClickHandler(event){
      event.preventDefault();
      const clickedElement = this;
      const href = clickedElement.getAttribute('href');
      generateTitleLinks('[data-author="' + href.replace('#author-', '') + '"]');


  }
  function addClickListenersToAuthors(){
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    for(let authorLink of authorLinks ){
      authorLink.addEventListener('click', authorClickHandler);
    }

  }
  addClickListenersToAuthors();
