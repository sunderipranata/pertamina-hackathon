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
    console.log('this propss', this.props)
    let search = this.props.location.search
    let splits = search.split('=')
    let key = splits[0], value = splits[1]
    let category = null
    let type = null

    if(key.toLowerCase().includes('type')) {
      type = value
    } else {
      category = value
    }

    if(category !== null) {
      console.log('ini category')
      this.setState({
        category: category,
        type: null,
        getBy: 'CATEGORY'
      })
    } else {
      console.log('ini type')
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
            assetDetails: result.data.data == null ? [] : result.data.data
          })
        }
      });
    } else {
      assetService.getByType(type, (result) => {
        if (result.success) {
          console.log('result', result.data.data)
          this.setState({
            assetDetails: result.data.data == null ? [] : result.data.data
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
    let { getBy, category, type } = this.state
    let title = ''
    if(getBy == 'CATEGORY') {
      title = 'Search By Category - ' + category
    } else {
      title = 'Search by Type - ' + type
    }

    return (
      <Fragment>
        <Navbar title={ title } />
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
