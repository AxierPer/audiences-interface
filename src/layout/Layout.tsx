export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

