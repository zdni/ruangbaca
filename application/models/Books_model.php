<?php

class Books_model extends CI_Model {
    private $_table = 'books';

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

    public function book( $id = NULL, $document_id = NULL, $category_id = NULL  )
    {
        if( $id ) $this->db->where( $this->_table . '.id', $id);
        if( $document_id ) $this->db->where( $this->_table . '.document_id', $document_id);
        return $this->books( NULL, $category_id );
    }

    public function books( $title = NULL, $category_id = NULL  )
    {
        $this->db->select( $this->_table . '.*' );
        $this->db->select( 'documents.code' );
        $this->db->select( 'documents.title' );
        $this->db->select( 'documents.slug' );
        $this->db->select( 'documents.writer' );
        $this->db->select( 'documents.cover' );
        $this->db->select( 'documents.type' );
        $this->db->select( 'categories.name AS category' );
        $this->db->join(
            'documents',
            'documents.id = books.document_id',
            'join'
        );
        $this->db->join(
            'categories',
            'categories.id = books.category_id',
            'join'
        );

        if( $category_id ) $this->db->where( $this->_table . '.category_id', $category_id);
        if( $title ) $this->db->where( 'documents.title LIKE', '%'.$title.'%');
        
        return $this->db->get( $this->_table );
    }
}

?>