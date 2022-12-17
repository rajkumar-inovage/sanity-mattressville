import React, { Fragment } from 'react'
import ReactHtmlParser from 'html-react-parser'
import Sidebar from './Sidebar'

const RightMattress = ({ data }) => {
  return (
    <Fragment>
      <section className={'right-mattress'}>
        <div className={'container-fluid'}>
          <div className={'d-flex flex-lg-row flex-column'}>
            <div className={'flex-shrink-1'}>
              <Sidebar />
            </div>
            <div className={'entry-data'}>
              <h1>{ReactHtmlParser(data.title)}</h1>
              <div className={'entry-data-inner'}>
                <p>{ReactHtmlParser(data.paragraph1)}</p>
                <p>{ReactHtmlParser(data.paragraph2)}</p>
              </div>
              <h2>The four main types of mattress:</h2>
              <div className={'entry-data-inner'}>
                <h3>{data.innerspring.title}</h3>
                <p>{data.innerspring.desc}</p>
                <div className={'pros'}>
                  <p>Pros:</p>
                  <p>{data.innerspring.pros.pros1}</p>
                  <p>{data.innerspring.pros.pros2}</p>
                </div>
                <div className={'cons'}>
                  <p>Cons: </p>
                  <p>{data.innerspring.cons.cons1}</p>
                  <p>{data.innerspring.cons.cons2}</p>
                </div>
              </div>

              <div className={'entry-data-inner'}>
                <h3>{data.pocketCoil.title}</h3>
                <p>{data.pocketCoil.desc}</p>
                <div className={'pros'}>
                  <p>Pros:</p>
                  <p>{data.pocketCoil.pros.pros1}</p>
                  <p>{data.pocketCoil.pros.pros2}</p>
                  <p>{data.pocketCoil.pros.pros3}</p>
                </div>
                <div className={'cons'}>
                  <p>Cons: </p>
                  <p>{data.pocketCoil.cons.cons1}</p>
                  <p>{data.pocketCoil.cons.cons2}</p>
                  <p>{data.pocketCoil.cons.cons3}</p>
                </div>
              </div>

              <div className={'entry-data-inner'}>
                <h3>{data.memoryFoam.title}</h3>
                <p>{data.memoryFoam.desc}</p>
                <div className={'pros'}>
                  <p>Pros:</p>
                  <p>{data.memoryFoam.pros.pros1}</p>
                  <p>{data.memoryFoam.pros.pros2}</p>
                  <p>{data.memoryFoam.pros.pros3}</p>
                  <p>{data.memoryFoam.pros.pros4}</p>
                </div>
                <div className={'cons'}>
                  <p>Cons: </p>
                  <p>{data.memoryFoam.cons.cons1}</p>
                  <p>{data.memoryFoam.cons.cons2}</p>
                  <p>{data.memoryFoam.cons.cons3}</p>
                </div>
              </div>

              <div className={'entry-data-inner'}>
                <h3>{data.latex.title}</h3>
                <p>{data.latex.desc}</p>
                <div className={'pros'}>
                  <p>Pros:</p>
                  <p>{data.latex.pros.pros1}</p>
                  <p>{data.latex.pros.pros2}</p>
                  <p>{data.latex.pros.pros3}</p>
                  <p>{data.latex.pros.pros4}</p>
                  <p>{data.latex.pros.pros5}</p>
                </div>
                <div className={'cons'}>
                  <p>Cons: </p>
                  <p>{data.latex.cons.cons1}</p>
                  <p>{data.latex.cons.cons2}</p>
                  <p>{data.latex.cons.cons3}</p>
                </div>
              </div>

              <div className={'entry-data-inner last-section'}>
                <strong>Sleeping on your side…</strong>
                <h2>{data.sleepStyle.title}</h2>
                <p>{data.sleepStyle.desc}</p>
                <strong>{data.sleepStyle.subTitle1}</strong>
                <p>{ReactHtmlParser(data.sleepStyle.desc1)}</p>
                <strong>{data.sleepStyle.subTitle2}</strong>
                <p>{ReactHtmlParser(data.sleepStyle.desc2)}</p>
                <strong>{data.sleepStyle.subTitle3}</strong>
                <p>{ReactHtmlParser(data.sleepStyle.desc3)}</p>
                <strong>{data.sleepStyle.subTitle4}</strong>
                <p>{ReactHtmlParser(data.sleepStyle.desc4)}</p>
                <strong>{data.sleepStyle.subTitle5}</strong>
                <p>{ReactHtmlParser(data.sleepStyle.desc5)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default RightMattress
