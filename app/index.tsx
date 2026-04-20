import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function Index() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  // return <Redirect href="/(auth)/login" />;
  return <Redirect href="/splash" />;
}