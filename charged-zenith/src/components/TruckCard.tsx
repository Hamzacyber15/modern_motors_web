'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Truck } from '@/services/trucks'
import { ArrowUpRight, Gauge, Weight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import styles from './TruckCard.module.css'

interface TruckCardProps {
  truck: Truck
  lang: string
  dict: any
}

export default function TruckCard({ truck, lang, dict }: TruckCardProps) {
  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.imageSection}>
        <Image 
          src={truck.image} 
          alt={truck.name} 
          fill 
          className={`${styles.truckImg} image-pop`}
        />
        <div className={styles.badge}>{truck.category}</div>
        <div className={styles.imageOverlay} />
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <span className={styles.brandTag}>{truck.brand}</span>
            <h3>{truck.name}</h3>
          </div>
          <span className={styles.price}>{truck.price}</span>
        </div>
        
        <p className={styles.description}>{truck.description}</p>
        
        <div className={styles.specs}>
          <div className={styles.specItem}>
            <Weight size={16} />
            <span>{truck.capacity}</span>
          </div>
          <div className={styles.specItem}>
            <Gauge size={16} />
            <span>{truck.engine}</span>
          </div>
        </div>
        
        <div className={styles.footer}>
          <Link href={`/${lang}/trucks/${truck.id}`} className={styles.viewBtn}>
            {dict.common.moreInfo}
            <ArrowUpRight size={16} />
          </Link>
          <Link href={`/${lang}/contact?interest=${truck.id}`} className={styles.inquireBtn}>
            {dict.common.buyNow}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
