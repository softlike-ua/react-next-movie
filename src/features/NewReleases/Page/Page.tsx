'use client'

import { useEffect, useState } from 'react'
import { ISlide } from 'types'
import { getSlides } from 'api/hooks'
import { Title } from 'components/ui/Title/Title'
import { Button } from 'components/ui/Button/Button'
import { Spinner } from 'components/ui/Spinner/Spinner'
import styles from './Page.module.scss';
import { NewReleaseCard } from '../components/NewReleaseCard/NewReleaseCard'

export const NewReleasesPage = () => {
	const [slides, setSlides] = useState<ISlide[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [queryPage, setQueryPage] = useState<number>(1)

	useEffect(() => {
		(async () => {
			try {
				setLoading(true)
				const detailedSlides: ISlide[] = (await getSlides(
					'movie',
					'upcoming',
					queryPage
				)) as ISlide[]
				setSlides([...slides, ...detailedSlides])
				setLoading(false)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [queryPage])

	const handleShowMore = () => {
		setQueryPage((prevState) => prevState + 1)
	}

	return (
			<div className={styles.wrapper}>
				<nav>
					<a href='/'>
						<svg>
							<use href='/icons/sprite.svg#arrow'/>
						</svg>
					</a>
					<Title className={styles.title} typeTitle='h1' size='l'>New releases</Title>
				</nav>
							<div className={styles.grid}>
								{slides.map((slide) => (
									<NewReleaseCard key={slide.id} {...slide}/>
								))}
							</div>
							<div className={styles.button}>
								{loading
									?
									<Spinner />
									:
									<Button handleClick={handleShowMore} typeBtn='button' appearance='white'>Show more</Button>
								}
							</div>
			</div>
	)
}