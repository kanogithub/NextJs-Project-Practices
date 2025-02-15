import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/config/database';
import Property from '@/models/Property';
import PropertyHeadImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails'
import PropertyAside from '@/components/PropertyAside';
import { FaArrowLeft } from 'react-icons/fa';
import { convertToSerializableObject } from "@/utils/mapper/convertToObject";

const PropertyPage = async ({ params }) => {
  let property

  try {
    await connectDB()
    property = convertToSerializableObject(await Property.findById(params.id).lean())
  } catch (error) {
    console.log(error)
  }

  if (!property) return notFound()
  
  return <>
    <PropertyHeadImage imageUrl={ property.images[0] } />
    <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          <FaArrowLeft className='mr-2' /> Back to Properties
        </Link>
      </div>
    </section>
    <section className="bg-blue-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          {/* Property Info */}
          <PropertyDetails property={ property } />
          <PropertyAside property={ property } />
        </div>
      </div>
    </section>
  </>
}
 
export default PropertyPage;