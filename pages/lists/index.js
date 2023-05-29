import {prisma} from '../../server/db/client'
import Link from 'next/link'
import ListsOfLists from '@/components/lists/lists-list';
import {useSession, getSession} from 'next-auth/client'

export default function AllLists({initialLists, books, user}) {

    const lists = [];
    console.log("this is user")
    console.log(user)
    console.log(initialLists)

    return (
      <>
        <div className='container-fluid bg-orange custom-banner'>
          <div className='content-box mx-auto'>
            <h1 className='big-header-fonts pt-4'>BROWSE LIST</h1>
              <div className='d-flex flex-row justify-content-between'>
                <h1 className='medium-header-fonts pt-5'>YOUR LISTS:</h1>
                <p className='para-fonts pt-5 mt-2'>view all</p>
              </div>
              <div class="h-line mb-3"></div>
              {initialLists.length > 0 && <ListsOfLists initialLists={initialLists} books={books}/>}
              {initialLists.length == 0 && <div>
                Add your first list!</div>}
                <div className='text-center'>
                  <Link href='/lists/addlist'>
                    <button className='btn btn-yellow px-5 my-4'>Add New List</button>
                  </Link>
                </div>
          </div>
        </div>
      </>
    )
}

    //GET DATA FROM PRISMADB 
export async function getServerSideProps(context) {
  const session = await getSession({req: context.req})
    if (!session) {
      return {
          redirect: {
              destination: '/auth',
              permanent: false
          }
      }
  }
  const user = await prisma.User.findFirst({
    where: {
        email:session.user.email,
        }
    });

    const lists = await prisma.List.findMany({
      where: {
          userId: user.id,
          }
      });

    const books = await prisma.Book.findMany();
    
    return {
      props: {
        initialLists: lists,
        books: books,
        user
      }
    };
  }
