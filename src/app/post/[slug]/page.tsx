import { Hero } from '@/components/hero';
import styles from './styles.module.scss'
import{getItemBySlug} from '@/utils/actions/get-data'
import { PostProps } from '@/utils/post.type';
import { Phone } from 'lucide-react';
import { Container } from '@/components/container';
import { Metadata } from 'next';

import Image from 'next/image';

export async function generateMetadata({ params: { slug} }:{
    params: { slug: string }
    }) : Promise<Metadata>{
        try{
            const {objects}: PostProps = await getItemBySlug(slug)
            .catch(() => {
                return {
                    title:"DevMotors - Sua oficina especializada!",
                    descripition:"Oficina de carros em São Paulo",
                }
            })

            return{
                title:`DevMotors - ${objects[0].title}`,
                description:`${objects[0].metadata.descripiton.text}`,
                openGraph: {
                    title:`DevMotors - ${objects[0].title}`,
                    images:[objects[0].metadata.banner.url]
                  },
                  robots:{
                    index:true,
                    follow:true,
                    nocache:true,
                    googleBot:{
                      index:true,
                      follow:true,
                      noimageindex:true,
                    }
                  }
            }
        }catch(err){
            return {
                title:"DevMotors - Sua oficina especializada!",
                description:"Oficina de carros em São Paulo",
            }
        }
    }


export default async function Page({ params: { slug} }:{
params: { slug: string }
}){
const {objects} : PostProps = await getItemBySlug(slug);



    return (
        <>
              <Hero
            heading={objects[0].title}
            buttonTitle={objects[0].metadata.button.title}
            buttonUrl={objects[0].metadata.button.url}
            bannerUrl={objects[0].metadata.banner.url}
            icon={<Phone size={24} color="#FFF"/>}
           />

           <Container> 
            <section className={styles.about}>

                <article className={styles.innerAbout}>
                    <h1 className={styles.title}>
                    {objects[0].metadata.descripiton.title}
                    </h1>
                    <p>
                    {objects[0].metadata.descripiton.text}
                    </p>
                    
                    {objects[0].metadata.descripiton.button_active && (
                                   <a href={objects[0].metadata.descripiton.button_url as string}
                                   target='_blank'
                                   className={styles.link}>
                                    {objects[0].metadata.descripiton.button_title}
                                   </a>
                    )}
                </article>

                <div className={styles.bannerAbout}>
                    <Image
                    className={styles.imageAbout}
                    alt={objects[0].title}
                    quality={100}
                    fill={true}
                    priority={true}
                    src={objects[0].metadata.descripiton.banner.url}
                    sizes="(max-width:700px) 100vw,(max-width:1024px) 75vw,50vw"
                    />

                </div>
            </section>
           </Container>
        </>
    )
}