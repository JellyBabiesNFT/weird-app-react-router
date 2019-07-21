import React from 'react';
import { css } from 'glamor'
import faqData from './data'
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'

const Faq = () => {
    return (
        <React.Fragment>
            {faqData.map(faq => (
                <React.Fragment key={faq.id}>
                    <h2>
                        <Link to={`/faq/${faq.id}`}>{faq.name}</Link>
                    </h2>

                    <ul>
                        {faq.resources.map((resource, index) => (
                            <Link key={index} to={`/faq/${faq.id}/${resource.name}`}><li>{resource.name}</li></Link>
                        ))}
                    </ul>
                </React.Fragment>
            ))}
        </React.Fragment>
    )
}

const SideNav = ({ active }) => {
    return (
        <div>
            <ul>
                {faqData.map(faq => (
                    <Link key={faq.id} to={`/faq/${faq.id}`}>
                        <li {...css(active === faq.id && {
                        color: 'red',
                        fontSize: '18px'
                    })}>{faq.name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

const SingleFaq = (props) => {
    const faq = faqData.find(faq => faq.id === props.match.params.faq)

    return(
        <div {...css({
            display: 'flex'
        })}>
            <SideNav active={props.match.params.faq} />
            {faq && (
                <div>
                    <h1>{faq.name}</h1>
                    <ul>
                        {faq.resources.map((resource, index) => (
                            <Link key={index} to={`/faq/${faq.id}/${resource.question}`}>
                                <li>{resource.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
            {!faq && <Redirect to='/faq' />}
        </div>
    )
}

const Answer = ({ match }) => {
    const faq = faqData.find(faq => faq.id === match.params.faq)

    const question = faq.resources.find(resource => resource.name.search(/${match.params.question}/))
    console.log(question)
    return (
        <div {...css({
            display: 'flex'
        })}>
            <Link to={`/faq/${faq.id}`}>Back</Link>
            <SideNav active={match.params.faq} />
            {question.description}
        </div>
    )
}

function App() {
  return (
    <BrowserRouter>
        <nav>
            <ul>
                <li>    
                    <Link to='/faq'>The faq page</Link>
                </li>
            </ul>
        </nav>
        <Route exact  path='/faq' component={Faq} />
        <Route  exact path='/faq/:faq' component={SingleFaq} />
        <Route  path='/faq/:faq/:question' component={Answer} />
    </BrowserRouter>
  );
}

export default App;
