/*
 * @Author: dingyuwen ding_yuwen@163.com
 * @Date: 2023-01-10 10:10:29
 * @LastEditTime: 2023-01-13 10:34:35
 * @LastEditors: dingyuwen
 * @Description:
 */

import { useAppSelector } from '@/store/hooks'

import { Title, createStyles, Card, Avatar, Text, Group, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
}));

export interface UserCardImageProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
  stats: { label: string; value: string }[];
}



export function UserCardImage({ image, avatar, name, job, stats }: UserCardImageProps) {
  const { classes, theme } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text align="center" size="lg" weight={500}>
        {stat.value}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <Card.Section sx={{ backgroundImage: `url(${image})`, height: 140 }} />
      <Avatar src={avatar} size={80} radius={80} mx="auto" mt={-30} className={classes.avatar} />
      <Text align="center" size="lg" weight={500} mt="sm">
        {name}
      </Text>
      <Text align="center" size="sm" color="dimmed">
        {job}
      </Text>
      <Group mt="md" position="center" spacing={30}>
        {items}
      </Group>
      <Button
        fullWidth
        radius="md"
        mt="xl"
        size="md"
        color={theme.colorScheme === 'dark' ? undefined : 'dark'}
      >
        Follow
      </Button>
    </Card>
  );
}

const UserInfo = () => {
	const { userInfo } = useAppSelector((state) => state.user)

	return (
		<div>
			<Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
				{userInfo.name}
			</Title>
		</div>
	)
}
export default UserInfo
