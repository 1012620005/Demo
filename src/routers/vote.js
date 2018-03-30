import voteList from '../views/vote/voteList.vue'
import myVote from '../views/vote/myvote.vue'
export const VOTE = [
	{
		path: '/voteList',
		component: voteList,
		name: 'voteList'
	},
	{
		path: '/myVote',
		component: myVote,
		name: 'myVote'
	}
]