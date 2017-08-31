# Firebase ☁️ APIs for Vodafoodies app
--
### __Base URL :__

    https://us-central1-vodafoodies-e3f2f.cloudfunctions.net
    
### __Request Headers :__

_All requests must contain the following headers:_

	uid : $(LOGGED_IN_USER_FIREBASE_ID)

### __Functions :__

- 👤 [**Users**](#users)
	- [updateUserData](#updateUserData)
- 👨🏻‍🍳 [**Venue Data**](#venue-data)
	- [addVenue](#addVenue)
	- [listedVenues](#listedVenues)
	- [getVenueMenu](#getVenueMenu)
- ➕ [**Adding Orders**](#adding-orders)
	- [addVenueOrder](#addVenueOrder)
	- [addUserOrder](#addUserOrder)
- 📋 [**Getting Venues Orders**](#getting-venues-orders)
	- [getOpenOrders](#getOpenOrders)
	- [getOrderSum](#getOrderSum)
	- [getOrderItemUsers](#getOrderItemUsers)
	- [getVenueOrderUsers](#getVenueOrderUsers)
- 🍽 [**Getting User Orders**](#getting-user-orders)
	- [getUserOrders](#getUserOrders)
	- [deleteUserOrderItem](#deleteUserOrderItem)
	- [deleteUserOrder](#deleteUserOrder)
	
<br/>
<br/>
## Users

### updateUserData
>Creates a new node with the user ID if not found
>or updates the user data if the ID wasn't found

__Path :__

	POST	/updateUserData
	
__Parameters :__

```javascript
{
  $(FIREBASE_USER_ID): {
    "name": "Michael",
    "email": "michael@gmail.com",
    "img": "https://www.fb.com/path/to/image",
    "phone": "0129423243",
    "fb_profile": "https://www.fb.com/user/profile"
  }
}
```
	
__Response :__

SUCCESS: 

```javascript
STATUS_CODE: 200
{
    "status": "Success",
    "result": "User Added Successfully"
}
```
	
<br/>
<br/>
## Venue Data

### addVenue

>Cretaes a new Venue node with the venue data provided
>
>// NOT FINISHED 

__Path :__

	POST	/addVenue
	
__Parameters :__

>Object generated from this [script](https://github.com/mikeAttia/Vodafoodies-Firebase/blob/master/MenueGenerationScript/menueGenerationScript_V_0.4.js)
	
__Response :__

SUCCESS: 

```javascript
"Venue Added successfully to database"
```

<br/>
### listedVenues
>Returns an array of all the listed Venues from the database including both the name and the ID of each Venue 

__Path :__

	GET		/listedVenues
	
__Parameters :__

>No parameters needed for this API
	
__Response :__

SUCCESS: 

```
STATUS_CODE: 200
{
    "9dcbafe1-2cb6ba67": "El Tabei El Domyati",
    "b67f667e-37699a92": "Sliders",
    "cc795c05-01ae11ff": "Majesty"
}
```

<br/>
### getVenueMenu
>Returns the menu of the Venue with the ID provided as parameter

__Path :__

	GET		/getVenueMenu
	
__Parameters :__

```
venue_id = $(VENUE_ID)
```
	
__Response :__

SUCCESS: 

>STATUS_CODE: 200
>
>Retruns the _menue_ node from the Venue object generated from this [script](https://github.com/mikeAttia/Vodafoodies-Firebase/blob/master/MenueGenerationScript/menueGenerationScript_V_0.4.js)


<br/>
<br/>
## Adding Orders

### addVenueOrder
>Creates a Venue Order with the posting user as Admin for this Venue Order
>
>N.B: The user must select a user order from the venue which should be included in the request parameters

__Path :__

	POST	/addVenueOrder
	
__Parameters :__

```javascript
{
  "venue_id": $(VENUE_ID),
  "order_time": 1504196109 /*Timestamp of Order time*/,
  "order_items": [
    {
      "item_id": "itemId",
      "item_size": "size",
      "category": "category",
      "name": "item name",
      "price": 30
    }
  ]
}
```
	
__Response :__

>Redirects to [addUserOrder](#addUserOrder) to add the user order to the recently created venue order

<br/>
### addUserOrder
>Adds the user Order provided to the Venue order id provided

__Path :__

	POST	/addUserOrder
	
__Parameters :__

```javascript
{
  "venue_order_id": $(VENUE_ORDER_ID),
  "order_items": [
    {
      "item_id": "itemId",
      "item_size": "size",
      "category": "category",
      "name": "item name",
      "price": 30
    }
  ]
}
```
	
__Response :__

SUCCESS: 

```javascript
STATUS_CODE: 200
{
    "status": "Success",
    "result": "User Added Successfully"
}
```


<br/>
<br/>
## Getting Venues Orders

### getOpenOrders
> Returns a list of all the open Orders and related data (Status & Order Time)

__Path :__

	GET		/getOpenOrders
	
__Parameters :__

>No parameters needed for this API
	
__Response :__

>N.B: *order_status* can be one of the following values:
>
- open
- cancelled
- ordered
- delivered


```javascript
STATUS_CODE: 200
{
    "result": [
        {
            "venue_order_id": "-KstMKE-Y-qQvg7Z8Ibo",
            "oreder_time": 1504196109,
            "order_status": "open",
            "venue_name": "El Tabei El Domyati",
            "venue_image": "https://s3.amazonaws.com/elmenusV3/Photos/Normal/v3aahr8n.jpg",
            "venue_phones": [
                "16015"
            ],
            "owner": {
                "id": "266f7884-f3a766d9",
                "name": "Michael Attia",
                "phone": "0120203043",
                "email": "michael@gmail.com"
            }
        }
    ],
    "status": "Successful Request"
}

```


<br/>
<br/>
## Getting User Orders

### getUserOrders
> Returns a list of all the Orders of the logged in user with related 

__Path :__

	/GET getUserOrders
	
__Parameters :__

>if no parameters were passed, the response will contain all the user orders from all the venues

	venue_order_id = $(VENUE_ORDER_ID)
	
__Response :__

>N.B: *order_status* can be one of the following values:
>
- open
- cancelled
- ordered
- delivered

```javascript
STATUS_CODE: 200
{
    "status": "Successfull Request",
    "result": [
        {
            "venue_order_id": "-KstMKE-Y-qQvg7Z8Ibo",
            "order_time": 1504196109,
            "order_status": "open",
            "venue_id": "9dcbafe1-2cb6ba67",
            "venue_name": "El Tabei El Domyati",
            "venue_order_admin": {
                "id": "266f7884-f3a766d9",
                "name": "Michael Attia",
                "phone": "0120203043"
            },
            "items": [
                {
                    "category": "category",
                    "item_id": "id",
                    "item_size": "size",
                    "name": "item name",
                    "price": 30
                }
            ]
        }
    ]
}
```


