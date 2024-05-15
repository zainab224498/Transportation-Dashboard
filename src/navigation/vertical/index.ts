// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'tabler:smart-home',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: 'Analytics',
          path: '/dashboards/analytics'
        }
      ]
    },
    {
      sectionTitle: 'Addresses'
    },
    {
      title: 'Addresses',
      icon: 'tabler:map-pin',
      children: [
        {
          title: 'Addresses',
          icon: 'tabler:map-pin',
          path: '/addresses/address'
        },
        {
          title: 'Countries',
          icon: 'tabler:map-pin-2',
          path: '/countries/country'
        },
        {
          title: 'Provinces',
          icon: 'tabler:map-pin-filled',
          path: '/provinces/province'
        },
        {
          title: 'Cities',
          icon: 'tabler:map-pin-pin',
          path: '/cities/city'
        },
        {
          title: 'Locations',
          icon: 'tabler:location',
          path: '/locations/location'
        }
      ]
    },
    {
      sectionTitle: 'Users'
    },
    {
      title: 'Users',
      icon: 'tabler:users-group',
      path: '/users/user'
    },
    {
      title: 'Users Phones',
      icon: 'tabler:users',
      path: '/usersPhones/userPhone'
    },
    {
      sectionTitle: 'Companies'
    },
    {
      title: 'Companies',
      icon: 'tabler:building',
      path: '/companies/company'
    },
    {
      title: 'Companies Addresses',
      icon: 'tabler:location-pin',
      path: '/companiesAddresses/companyAddress'
    },
    {
      title: 'Companies Phones',
      icon: 'tabler:file-phone',
      path: '/companiesPhones/companyPhone'
    },
    {
      title: 'Employees',
      icon: 'tabler:briefcase',
      path: '/employees/employee'
    },
    {
      sectionTitle: 'Jobs'
    },
    {
      title: 'Jobs',
      icon: 'tabler:briefcase-2',
      children: [
        {
          title: 'Jobs',
          path: '/jobs/job'
        },
        {
          title: 'Job Attribute Categories',
          path: '/jobsAttributesCategories/jobAttributeCategory'
        },
        {
          title: 'Jobs Attributes',
          path: '/jobsAttributes/jobAttribute'
        },
        {
          title: 'Attribute Values',
          path: '/attributeValues/attributeValue'
        },
        {
          title: 'Attributes',
          path: '/attributes/attribute'
        }
      ]
    },
    {
      sectionTitle: 'Orders'
    },
    {
      title: 'Orders',
      icon: 'tabler:article',
      path: '/orders/order'
    },
    {
      title: 'Order Status History',
      icon: 'tabler:align-box-center-middle',
      path: '/ordersStatusHistory/orderStatusHistory'
    },
    {
      sectionTitle: 'Trips'
    },
    {
      title: 'Trips',
      icon: 'tabler:map',
      path: '/trips/trip'
    },
    {
      title: 'Boarding Places',
      icon: 'tabler:location-up',
      path: '/boardingPlaces/boardingPlace'
    },
    {
      title: 'Disembarkation Places',
      icon: 'tabler:location-down',
      path: '/disembarkationPlaces/disembarkationPlace'
    },
    {
      sectionTitle: 'Passengers'
    },
    {
      title: 'Passengers',
      icon: 'tabler:luggage',
      path: '/passengers/passenger'
    },
    {
      title: 'Seats',
      icon: 'tabler:armchair',
      path: '/seats/seat'
    },
    {
      sectionTitle: 'Basic Pages'
    },
    {
      title: 'Transactions',
      icon: 'tabler:file-dollar',
      path: '/transactions/transaction'
    },
    {
      title: 'Cars',
      icon: 'tabler:car',
      path: '/cars/car'
    },
    {
      title: 'Phones',
      icon: 'tabler:phone',
      path: '/phones/phone'
    }
  ]
}

export default navigation
