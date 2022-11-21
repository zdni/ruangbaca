<?php

class Documents_model extends CI_Model {
    private $_table = 'documents';

    public function create( $data = NULL )
    {
        if ( $data ) {
            $this->db->insert( $this->_table, $data);
            $insert_id = $this->db->insert_id();
            return $insert_id;
        }
        return false;
    }

    public function update( $id = NULL, $data = NULL )
    {
        if ( $id && $data ) {
            $this->db->where( $this->_table . '.id', $id );
            return $this->db->update( $this->_table, $data );
        }
        return false;
    }

    public function delete( $id = NULL )
    {
        if ( $id ) {
            $this->db->where( $this->_table . '.id', $id );
            return $this->db->delete( $this->_table );
        }
        return false;
    }

    public function document( $id = NULL )
    {
        if( $id ) $this->db->where('id', $id);
        return $this->documents();
    }

    public function documents( $title = NULL, $type = NULL, $start = NULL, $end = NULL )
    {
        $this->db->select( $this->_table . '.*' );
        if( is_numeric($start) && $end ) return $this->db->get( $this->_table, $end, $start );
        if( $title ) $this->db->where( $this->_table . '.title LIKE', '%'.$title.'%');
        if( $type ) $this->db->where( $this->_table . '.type', $type);
        return $this->db->get( $this->_table );
    }
}

?>