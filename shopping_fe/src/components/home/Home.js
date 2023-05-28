import React, { Component } from 'react'
import { Statistic, Icon, Grid, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { storeApi } from '../misc/StoreApi'
import { handleLogError } from '../misc/Helpers'

class Home extends Component {
    state = {
        numberOfUsers: 0,
        isLoading: false,
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        try {
            let response = await storeApi.numberOfUsers()
            const numberOfUsers = response.data

            this.setState({ numberOfUsers })
        } catch (error) {
            handleLogError(error)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    render() {
        const { isLoading } = this.state
        if (isLoading) {
            return (
                <Segment basic style={{ marginTop: window.innerHeight / 2 }}>
                    <Dimmer active inverted>
                        <Loader inverted size='huge'>Loading</Loader>
                    </Dimmer>
                </Segment>
            )
        } else {
            const { numberOfUsers } = this.state
            return (
                <Container text>
                    <Grid stackable columns={1}>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Segment color='blue'>
                                    <Statistic>
                                        <Statistic.Value><Icon name='user' color='grey' />{' '}{numberOfUsers}</Statistic.Value>
                                        <Statistic.Label>Users</Statistic.Label>
                                    </Statistic>
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            )
        }
    }
}

export default Home