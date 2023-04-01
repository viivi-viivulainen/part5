describe('Blog app', function() {
  beforeEach(function() {
    //cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'Johtaja',
      name: 'Einari Rapu',
      blogs: [],
      password: 'raha'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  //Testaan aukeaako etusivu
  it('front page opens', function() {
    cy.contains('Login')
  })

  //Testataan avautuuko kirjautumislomake
  it('login form is shown', function() {
    cy.contains('Log in').click()
    cy.get('#username').type('Johtaja')
    cy.get('#password').type('raha')
    cy.contains('Login').click()
    cy.contains('Einari Rapu logged in')
  })

  //Testataan kirjautumista väärillä ja oikeilla crediteillä
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('Johtaja')
      cy.get('#password').type('raha')
      cy.contains('Login').click()
      cy.contains('Einari Rapu logged in')
    })

    it('Fails with wrong credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('Jooohtaja')
      cy.get('#password').type('rahuli')
      cy.contains('Login').click()
      cy.contains('Wrong')
    })
  })

  //Luodaan blogi kun ollaan kirjauduttu sisään
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('Johtaja')
      cy.get('#password').type('raha')
      cy.contains('Login').click()
    })

    it('new blog created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('blog created')
      cy.get('#author').type('by me')
      cy.get('#url').type('blog/created')
      cy.contains('save post').click()
      cy.contains('blog created')
    })
  })

  //Testataan Blogista tykkäämistä
  describe('When liked', function() {
    beforeEach(function() {
      cy.contains('Log in').click()
      cy.get('#username').type('Johtaja')
      cy.get('#password').type('raha')
      cy.contains('Login').click()
    })

    it('Blog is liked', function() {
      cy.contains('View').click()
      cy.contains('blog created')
      cy.contains('like').click()
      //cy.contains('1')
    })

    //Poistetaan blogi ja testatan näkyykö poistettu blogi
    describe('Blog is removed', function() {
      beforeEach(function() {
      })

      //blogi voidaan poistaa
      it('Blog removed', function() {
        cy.contains('blog created').parent().find('Button').contains('View').click()
        cy.contains('blog created').contains('remove').click()
        cy.contains('blog created').should('not.exist')
      })


      //Tarkistetaan sisältääkö toisen käyttäjän lisäämä blogi poisto napin
      it('Blog cannot be removed', function() {

        /*
        //Blogin toiselle käyttäjälle lisääminen
        const blog = {
          title: 'Not removable',
          author: 'Patrik',
          url: 'not/removable/by/u',
          likes: 10,
          userId: '6427e24ec74f5ec2c391cc1d'
        }
        cy.request('POST', 'http://localhost:3003/api/blogs', blog) */

        cy.contains('BlogiPat').parent().find('Button').contains('View').click()
        cy.contains('BlogiPat').parent().find('Button').contains('remove').should('not.exist')

      })
    })

    //Testaan onko blogit järjestyksessä
    it('Blogs are sorted', function() {
      cy.get('.blog').eq(0).should('contain', 'Blogilainen Venla')
      cy.get('.blog').eq(1).should('contain', 'BlogiPat')
    })
  })
})

