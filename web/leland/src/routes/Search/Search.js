import React, { Component, Fragment } from 'react'
import Navbar from '../../components/Navbar'

import { thousandSeparator } from '../../utils/currency'

import assetService from '../../services/AssetService'

import { withRouter } from 'react-router-dom'

import CardAssets from '../../components/CardAssets'

import './Search.scss'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      category: null,
      type: null,
      getBy: '', //CATEGORY/TYPE,
      assetDetails: []
    }
  }

  componentWillMount() {
    //get by query param
    let category = ''
    let type = ''

    if(category !== null) {
      this.setState({
        category: category,
        type: null,
        getBy: 'CATEGORY'
      })
    } else {
      this.setState({
        category: null,
        type: type,
        getBy: 'TYPE'
      })
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    let { getBy, category, type } = this.state

    if(getBy == 'CATEGORY') {
      assetService.getByCategory(category, (result) => {
        if (result.success) {
          console.log('result', result.data.data)
          this.setState({
            assetDetails: result.data.data
          })
        }
      });
    } else {
      assetService.getByTye(type, (result) => {
        if (result.success) {
          console.log('result', result.data.data)
          this.setState({
            assetDetails: result.data.data
          })
        }
      });
    }
  }

  renderCardAssets() {
    let { assetDetails } = this.state
    let result = []
    assetDetails.forEach((a) => {
      let obj = (
        <CardAssets
          id = { a.id }
          title= { a.name }
          type= { a.type }
          location= { a.city }
          area={ a.type == 'TANAH' ? a.land_area : a.building_area }
          bidders={ 101 }
          suit= { a.category }
          price={ a.start_price }
          style = {{ marginBottom: '10' }}
        />
      )

      result.push(obj)
    })

    return (
      result
    )
  }

  render() {
    return (
      <Fragment>
        <Navbar title="Detail" />
        <div className="ph-detail__container">
          <section name="section-popular" className="container">
            { this.renderCardAssets() }
          </section>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Search)
