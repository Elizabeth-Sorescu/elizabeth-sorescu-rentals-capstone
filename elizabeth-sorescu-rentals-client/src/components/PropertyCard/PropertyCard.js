function PropertyCard({ item }) {
  return (
    <main>
      this is the property card:
      <p>{item.property_name}</p>
      <p>{item.address}</p>
    </main>
  );
}

export default PropertyCard;
