{
  "success": true,
  "message": "successful",
  "data": [
    {
      "id": 1,
      "product_type_id": 1,
      "refinery_id": 1,
      "price": 320,
      "added_by": 1,
      "status": "active",
      "created_at": "2025-01-28T11:57:47.000000Z",
      "updated_at": "2025-01-28T11:57:47.000000Z",
      "deleted_at": null,
      "refinery": {
        "id": 1,
        "user_id": 2,
        "license_number": "string",
        "license_details": "string",
        "description": "string",
        "status": "pending",
        "created_at": "2025-01-26T21:24:47.000000Z",
        "updated_at": "2025-01-26T21:24:47.000000Z",
        "deleted_at": null,
        "exchange_rate": [
          {
            "id": 2,
            "refinery_id": 1,
            "added_by": 1,
            "currency_type_id": 3,
            "name": "naira",
            "rate": 4000,
            "created_at": "2025-01-27T00:23:21.000000Z",
            "updated_at": "2025-01-27T00:23:21.000000Z",
            "deleted_at": null
          },
          {
            "id": 3,
            "refinery_id": 1,
            "added_by": 1,
            "currency_type_id": 4,
            "name": "dolls",
            "rate": 2000,
            "created_at": "2025-01-27T18:31:25.000000Z",
            "updated_at": "2025-01-27T23:23:17.000000Z",
            "deleted_at": null
          },
          {
            "id": 4,
            "refinery_id": 1,
            "added_by": 1,
            "currency_type_id": 5,
            "name": "pouns",
            "rate": 1300,
            "created_at": "2025-01-27T18:31:25.000000Z",
            "updated_at": "2025-01-27T18:31:25.000000Z",
            "deleted_at": null
          },
          {
            "id": 5,
            "refinery_id": 1,
            "added_by": 1,
            "currency_type_id": 6,
            "name": "yen",
            "rate": 770,
            "created_at": "2025-01-28T12:15:57.000000Z",
            "updated_at": "2025-01-28T12:16:51.000000Z",
            "deleted_at": null
          }
        ],
        "user": {
          "id": 2,
          "name": "string",
          "email": "refinery@example.com",
          "email_verified_at": null,
          "role": "none",
          "phone_number": "stringstrin",
          "address": "string",
          "city": "string",
          "state": "string",
          "country": "string",
          "created_at": "2025-01-26T21:24:47.000000Z",
          "updated_at": "2025-01-26T21:24:47.000000Z",
          "assigned_by": null,
          "deleted_at": null
        }
      },
      "product_type": {
        "id": 1,
        "name": "LPG",
        "description": "liquid",
        "added_by": 1,
        "created_at": "2025-01-28T11:57:23.000000Z",
        "updated_at": "2025-01-28T11:57:23.000000Z",
        "deleted_at": null
      }
    }
  ],
  "metadata": {
    "total": 1,
    "per_page": 15,
    "current_page": 1,
    "last_page": 1,
    "previous_page_url": null,
    "next_page_url": null,
    "pages": {
      "1": "https://tms.sdssn.org/api/marketers/products?page=1"
    }
  }
}