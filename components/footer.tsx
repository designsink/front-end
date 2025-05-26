export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pb-12">
      <div className="container mx-auto">
        <div className="border-t border-gray-800 mt-12 pt-10 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} 디자인 씽크. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
