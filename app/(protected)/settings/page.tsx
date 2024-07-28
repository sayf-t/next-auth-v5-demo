import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div className="max-w-md overflow-x-auto break-words">
      <pre className="p-4 bg-gray-100 rounded">
        <code className="text-sm text-gray-800">
          {JSON.stringify(session, null, 2)}
        </code>
      </pre>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
