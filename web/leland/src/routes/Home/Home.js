import React, { Component, Fragment } from 'react'
import Slider from 'react-slick'

import './Home.scss'
import category_tanah from './assets/category-tanah.png'
import category_bangunan from './assets/category-bangunan.png'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const sliderSettings = {
  autoplay: false,
  dots: false,
  infinite: false,
  speed: 300,
  arrows: false,
  slidesToShow: 1,
  variableWidth: true
}

class Home extends Component {
  render() {
    return (
      <Fragment>
        <div className="ph-home__wrapper">
          <div className="ph-home__top">
            <section name="category" className="container">
              <h2 className="u-mt0">Kategori Aset</h2>
              <div className="category">
                <div className="card container u-center">
                  <img src={category_tanah} width="70" />
                  <p className="text u-mb0">Tanah</p>
                </div>
                <div className="card container u-center">
                  <img src={category_bangunan} width="70" />
                  <p className="text u-mb0">Bangunan</p>
                </div>
              </div>
            </section>
            <section name="suit-fot" className="container">
              <h2 className="u-mt0">Aset cocok Aset</h2>
            </section>
            <Slider {...sliderSettings}>
              <div style={{ 'width': '115px', 'marginLeft': '16px' }}>test</div>
              <div style={{ 'width': '115px', 'marginLeft': '16px' }}>test</div>
              <div style={{ 'width': '115px', 'marginLeft': '16px' }}>test</div>
              <div style={{ 'width': '115px', 'marginLeft': '16px' }}>test</div>
            </Slider>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Home
