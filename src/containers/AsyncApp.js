import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit,
} from '../actions';
import Picker from '../components/Picker';
import Posts from '../components/Posts';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, selectSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedSubreddit !== prevProps.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = this.props;
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }

  handleChange(nextSubreddit) {
    this.props.dispatch(selectSubreddit(nextSubreddit));
    this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  render() {
    const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
    return (
      
    )
  }
}
