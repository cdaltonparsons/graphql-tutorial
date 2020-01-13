const { gql } = require("apollo-server");

const typeDefs = gql`
  # Schema will go here
  # An exclamation point after a declared field's type means "this field's value can never be null"
  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }
  # If a declared field's type is in [Square Brackets], it's an array of the specified type. If an array has an exclamation point after it, the array cannot be null, but it can be empty.
  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
  # This Query type defines three available queries for clients to execute: launches, launch, and me.
  # The launches query will return an array of all upcoming Launches.
  # The launch query will return a single Launch that corresponds to the id argument provided to the query.
  # The me query will return details for the User that's currently logged in.
  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    me: User
  }

# This Mutation type defines three available mutations for clients to execute: bookTrips, cancelTrip, and login.
# The bookTrips mutation enables a logged-in user to book a trip on one or more Launches (specified by an array of launch IDs).
# The cancelTrip mutation enables a logged-in user to cancel a trip that they previously booked.
# The login mutation enables a user to log in by providing their email address.
  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): String # login token
  }

  type TripUpdateResponse {
      success: Boolean!
      message: String
      launches: [Launch]
  }
`;

module.exports = typeDefs;
