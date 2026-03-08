import { About } from '@widgets/about/index';
import { Contact } from '@widgets/contact/index';
import { Education } from '@widgets/education/index';
import { Experience } from '@widgets/experience/index';
import { Hero } from '@widgets/hero/index';
import { Projects } from '@widgets/projects/index';
import { Skills } from '@widgets/skills/index';

import styles from './styles.module.scss';

export default function Home() {
	return (
		<div className={styles.home}>
			<Hero />
			<About />
			<Experience />
			<Skills />
			<Projects />
			<Education />
			<Contact />
		</div>
	);
}
