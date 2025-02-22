import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';  // Updated import
import type { AppRouter } from '../../backend/src/tRPC/router';
import { TRPCProvider } from './utils/trpc';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

// Create a simple component to test the tRPC endpoint
function HelloButton() {
  const [name, setName] = useState<string | undefined>(undefined);
  
  // Use the TanStack React Query hook with tRPC client directly
  const { data, refetch, isLoading } = useQuery({
    queryKey: ['hello', name],
    queryFn: () => 
      createTRPCClient<AppRouter>({
        links: [httpBatchLink({ url: 'http://localhost:3000/trpc/' })],
      }).hello.query(name),
    enabled: false, // Only run when we manually trigger it
  });

  const handleClick = () => {
    setName("User");
    refetch();
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Say Hello'}
      </button>
      {data && <p>{data}</p>}
    </div>
  );
}

export function App() {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000',
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <h1>hii</h1>
        <HelloButton />
      </TRPCProvider>
    </QueryClientProvider>
  );
}