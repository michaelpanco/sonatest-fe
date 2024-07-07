function App() {
  // our HS client ID
  const client_id = "89554a62-1a3b-4b93-a4dc-633004b21b40";
  // this will be the redirect URL once the user request oauth
  const redirect_url = "http://localhost:3000/auth-callback";
  // request scope required by HS
  const scope = "oauth crm.lists.read crm.objects.contacts.read";

  return (
    <div className="h-screen flex items-center justify-center">
      <div>
        <a
          href={`https://app.hubspot.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&scope=${scope}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login via Hubspot
        </a>
      </div>
    </div>
  );
}

export default App;
